import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser } from "@/controllers/supabase.controller";
import {
  getStudentBySupabaseId,
  updateStudent,
} from "@/controllers/student.controller";
import { Student } from "@/models/student.model";

export const useProfileData = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    codeforcesHandle: "",
    avatarUrl: null as string | null,
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
      codeforcesHandle: student?.codeforces_handle || "",
    }));
    setIsEditing(!isEditing);
  };

  const handleAvatarUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim();
    setFormData((prev) => ({ ...prev, avatarUrl: url || "" }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!student?.id || !user?.id) {
      alert("Error: No se puede actualizar el perfil sin un estudiante válido");
      return;
    }
    updateStudentMutation.mutate({
      name: formData.name,
      surname: formData.surname,
      avatar: formData.avatarUrl || "",
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
    handleAvatarUrlChange,
    handleSave,
    handleInputChange,
    setIsEditing,
    setFormData,
  };
};
