"use client";

import MainNavbar from "@/components/shared/main-navbar";
import Footer from "@/components/shared/footer";
import { useProfileData } from "@/hooks/use-profile-data";
import { useStudentContests } from "@/hooks/use-student-contests";
import { ProfileSkeleton } from "@/components/profile/profile-skeleton";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileStats } from "@/components/profile/profile-stats";
import { ContestsHistory } from "@/components/profile/contests-history";
import { navLinks } from "@/lib/nav-links";

export default function ProfilePage() {
  const {
    student,
    loadingStudent,
    isEditing,
    formData,
    handleEditing,
    handleAvatarUrlChange,
    handleSave,
    handleInputChange,
    setFormData,
  } = useProfileData();

  const { contests, loadingContests } = useStudentContests(student?.id);

  return (
    <div className="min-h-[100dvh] flex flex-col dark:from-[#121212] dark:to-[#121212] bg-gradient-to-b from-[--azul-niebla] to-[--white]">
      <MainNavbar navLinks={navLinks} />
      <div className="flex-1 max-w-6xl mx-auto p-6 md:p-8 w-full mt-[10rem]">
        <h1 className="text-3xl md:text-4xl font-bold text-[--azul-noche] dark:text-white mb-6">
          Perfil
        </h1>
        <div className="space-y-6">
          {/* Información básica */}
          {loadingStudent ? (
            <ProfileSkeleton />
          ) : (
            <ProfileHeader
              student={student}
              email={formData.email} // Pass email from formData which is set from user
              isEditing={isEditing}
              formData={formData}
              onEditToggle={handleEditing}
              onSave={handleSave}
              onInputChange={handleInputChange}
              onAvatarUrlChange={handleAvatarUrlChange}
              setFormData={setFormData}
            />
          )}

          {/* Estadísticas creativas */}
          {!loadingStudent && <ProfileStats student={student} />}

          {/* Historial de competencias */}
          <ContestsHistory contests={contests} loading={loadingContests} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
