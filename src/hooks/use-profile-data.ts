import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser } from "@/controllers/supabase.controller";
import {
  getStudentBySupabaseId,
  updateStudent,
} from "@/controllers/student.controller";
import { verifyHandle } from "@/controllers/codeforces.controller";
import { Student } from "@/models/student.model";
import { uploadAvatarAction, deleteAvatarAction } from "@/app/profile/actions";

export const useProfileData = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    codeforcesHandle: "",
    avatarUrl: null as string | null,
    avatarFile: null as File | null,
    avatarPreview: null as string | null,
  });

  // Query for User
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const u = await getUser();
      if (u) {
        setFormData((prev) => ({ ...prev, email: u.email || "" }));
      }
      return u;
    },
  });

  // Query for Student
  const { data: student, isLoading: loadingStudent } = useQuery({
    queryKey: ["student", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const s = await getStudentBySupabaseId(user.id);
      if (s) {
        setFormData((prev) => ({
          ...prev,
          codeforcesHandle: s.codeforces_handle || "",
        }));
      }
      return s;
    },
    enabled: !!user?.id,
  });

  // Mutation for updating student
  const updateStudentMutation = useMutation({
    mutationFn: async (updatedStudent: Partial<Student>) => {
      if (!student?.id) throw new Error("No student ID");
      return updateStudent(Number(student.id), updatedStudent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student", user?.id] });
      setIsEditing(false);
    },
    onError: (error) => {
      alert("Error al actualizar el perfil: " + error);
    },
  });

  const handleEditing = () => {
    setFormData((prev) => ({
      ...prev,
      name: student?.name || "",
      surname: student?.surname || "",
      avatarUrl: student?.avatar || "",
      avatarFile: null,
      avatarPreview: null,
      codeforcesHandle: student?.codeforces_handle || "",
    }));
    setIsEditing(!isEditing);
  };

  const handleAvatarFileChange = (
    file: File | null,
    preview: string | null,
  ) => {
    setFormData((prev) => ({
      ...prev,
      avatarFile: file,
      avatarPreview: preview,
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!student?.id || !user?.id) {
      alert("Error: No se puede actualizar el perfil sin un estudiante válido");
      return;
    }

    const handleChanged =
      formData.codeforcesHandle !== (student?.codeforces_handle || "");
    if (handleChanged && formData.codeforcesHandle.trim()) {
      const isValid = await verifyHandle(formData.codeforcesHandle.trim());
      if (!isValid) {
        alert(
          "El handle de Codeforces no es válido. Por favor verifica que el usuario existe en Codeforces.",
        );
        return;
      }
    }

    let finalAvatarUrl = formData.avatarUrl;

    // Si hay un nuevo archivo, subirlo primero
    if (formData.avatarFile) {
      try {
        const formDataToUpload = new FormData();
        formDataToUpload.append("avatar", formData.avatarFile);
        const { error, url } = await uploadAvatarAction(formDataToUpload);

        if (error) {
          alert(`Error al subir el avatar: ${error}`);
          return;
        }

        if (url) {
          finalAvatarUrl = url;
          // Eliminar el avatar anterior si existe y es diferente
          if (student?.avatar && student.avatar !== url) {
            await deleteAvatarAction(student.avatar);
          }
        }
      } catch (error) {
        alert(`Error al subir el avatar: ${error}`);
        return;
      }
    }

    updateStudentMutation.mutate({
      name: formData.name,
      surname: formData.surname,
      avatar: finalAvatarUrl || "",
      codeforces_handle: formData.codeforcesHandle,
    });
  };

  return {
    user,
    student,
    loadingStudent,
    isEditing,
    formData,
    handleEditing,
    handleAvatarFileChange,
    handleSave,
    handleInputChange,
    setIsEditing,
    setFormData,
  };
};
