import { Member } from "@/models/member.model";
import React, { useState } from "react";
import { PeriodTitle } from "../ui/period-title";
import { InactiveMemberCard } from "../ui/inactive-member-card";
import ActiveMemberModal from "@/components/home/member-modal";

interface TimelineProps {
  sortedPeriods: string[];
  grouped: Record<string, Member[]>;
}

export const InactiveMembersTimeline: React.FC<TimelineProps> = ({
  sortedPeriods,
  grouped,
}) => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleClickMember = (member: Member) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  const handleOnCloseModal = () => {
    setSelectedMember(null);
    setModalOpen(true);
  };

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-200 via-blue-300 to-blue-200"></div>
      <div className="space-y-16">
        {sortedPeriods.map((period) => (
          <div key={period} className="relative">
            {/* Period Title */}

            <PeriodTitle period={period} groupLength={grouped[period].length} />

            {/* Members */}
            <div className="flex flex-wrap ml-[17vw] mr-[3vw] md:m-[5vw] gap-11">
              {grouped[period].map((member) => (
                <InactiveMemberCard
                  key={member._id}
                  member={member}
                  onClick={() => {
                    handleClickMember(member);
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Espaciador para que la última tarjeta no quede pegada al fondo */}
      <div className="h-16" />
      <ActiveMemberModal
        isOpen={isModalOpen}
        member={selectedMember}
        onClose={handleOnCloseModal}
      />
    </div>
  );
};
