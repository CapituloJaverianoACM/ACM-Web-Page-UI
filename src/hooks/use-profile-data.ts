import { useState, useEffect } from "react";
import { getUser } from "@/controllers/supabase.controller";
import {
  getStudentBySupabaseId,
  updateStudent,
} from "@/controllers/student.controller";
import { Student } from "@/models/student.model";
import { User } from "@supabase/supabase-js"; // Assuming User type comes from here or similar

export const useProfileData = () => {
  const [user, setUser] = useState<User | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    codeforcesHandle: "",
    avatarUrl: null as string | null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUser();
        setUser(fetchedUser);
        setFormData((prev) => ({ ...prev, email: fetchedUser?.email || "" }));
      } catch (error) {
        alert("Error al cargar usuario: " + error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoadingStudent(true);
        if (user?.id) {
          const fetchedStudent = await getStudentBySupabaseId(user.id);
          setStudent(fetchedStudent);
          setFormData((prev) => ({
            ...prev,
            codeforcesHandle: fetchedStudent?.codeforces_handle || "",
          }));
        } else {
          setStudent(null);
        }
      } catch (error) {
        console.error("Error al cargar el estudiante:", error);
        setStudent(null);
      } finally {
        setLoadingStudent(false);
      }
    };

    if (user) {
      fetchStudent();
    } else {
      setStudent(null);
      setLoadingStudent(false);
    }
  }, [user]);

  const handleEditing = () => {
    setFormData((prev) => ({
      ...prev,
      name: student?.name || "",
      surname: student?.surname || "",
      avatarUrl: student?.avatar || null,
      codeforcesHandle: student?.codeforces_handle || "",
    }));
    setIsEditing(!isEditing);
  };

  const handleAvatarUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim();
    setFormData((prev) => ({ ...prev, avatarUrl: url || null }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!student?.id || !user?.id) {
      alert("Error: No se puede actualizar el perfil sin un estudiante válido");
      return;
    }
    try {
      const updatedStudent = {
        ...student,
        name: formData.name,
        surname: formData.surname,
        avatar: formData.avatarUrl,
        codeforces_handle: formData.codeforcesHandle,
      };

      await updateStudent(Number(student.id), updatedStudent);

      const refreshedStudent = await getStudentBySupabaseId(user.id);
      if (refreshedStudent) {
        setStudent(refreshedStudent);
        setFormData((prev) => ({
          ...prev,
          name: refreshedStudent.name || "",
          surname: refreshedStudent.surname || "",
          avatarUrl: refreshedStudent.avatar || null,
          codeforcesHandle: refreshedStudent.codeforces_handle || "a",
        }));
      }

      setIsEditing(false);
    } catch (error) {
      alert("Error al actualizar el perfil: " + error);
    }
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
    setIsEditing, // In case we need manual control
    setFormData, // In case needed (e.g. onError of image)
  };
};
