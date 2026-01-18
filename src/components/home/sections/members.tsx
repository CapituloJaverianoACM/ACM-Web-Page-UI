"use client";

import { useState } from "react";
import MemberCard from "../member-card";
import MemberModal from "../member-modal";
import { Member } from "@/models/member.model";
import { getMembers } from "@/controllers/member.controller";
import { useQuery } from "@tanstack/react-query";
import { MemberLoaderCard } from "../ui/member-loader-card";
import { InactiveMembersLinkCard } from "../ui/inactive-member-link-card";

export function Members() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: members, isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
  });

  const handleMemberClick = (member: Member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div
      id="members"
      className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center space-y-4 mb-10">
        <h1 className="dark:text-white">Nuestro Equipo</h1>
        <p className="text-xl dark:text-white/80">
          Conoce a los talentosos individuos que hacen que nuestro capítulo sea
          excepcional
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <MemberLoaderCard key={`member-loader-${i}`} />
          ))}
        {!isLoading &&
          members
            .filter((member) => member.active)
            .map((member) => (
              <MemberCard
                key={member._id}
                member={member}
                onClick={() => handleMemberClick(member)}
              />
            ))}
        {/* Inactive Members Card */}
        <InactiveMembersLinkCard />
      </div>
      <MemberModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
