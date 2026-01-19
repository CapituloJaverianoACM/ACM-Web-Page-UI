"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import MemberCard from "../member-card";
import MemberModal from "../member-modal";
import { Member } from "@/models/member.model";
import { getMembers } from "@/controllers/member.controller";
import { useQuery } from "@tanstack/react-query";
import { MemberLoaderCard } from "../ui/member-loader-card";
import { InactiveMembersLinkCard } from "../ui/inactive-member-link-card";

export function Members() {
  const t = useTranslations("Members");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const MEMBERS_PRIORITY = { Presidente: 3, Vicepresidente: 2, Tesorero: 1 };
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
        <h1 className="dark:text-white">{t("title")}</h1>
        <p className="text-xl dark:text-white/80">{t("description")}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <MemberLoaderCard key={`member-loader-${i}`} />
          ))}
        {!isLoading &&
          members 
            .filter((member) => member.active)
            .toSorted(
              (first, second) =>
                (MEMBERS_PRIORITY[second.role] ?? 0) -
                (MEMBERS_PRIORITY[first.role] ?? 0),
            )
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
