import { Member } from "@/models/member.model";
import React, { MouseEventHandler } from "react";
import { Badge } from "@/components/home/ui/badge";
import { InactiveMemberImage } from "./inactive-member-image";
import { InactiveMemberBody } from "./inactive-member-body";

export interface InactiveMemberCardProps {
  member: Member;
  onClick: MouseEventHandler;
}

export const InactiveMemberCard: React.FC<InactiveMemberCardProps> = ({
  member,
  onClick,
}) => {
  return (
    <div
      key={member._id}
      className="relative flex items-start gap-4 w-96"
      onClick={onClick}
    >
      <div className="flex-1">
        <div className="card rounded-md bg-(--azul-niebla) flex-row p-md transition-all duration-300 hover:scale-[1.025] overflow-hidden dark:bg-(--azul-electrico)">
          {/* Imagen, info y botones en una fila */}
          <div className="flex flex-row items-center gap-6">
            {/* Imagen */}
            <InactiveMemberImage member={member} />
            {/* Contenido principal */}
            <InactiveMemberBody member={member} />
          </div>
          {/* Skills */}
          <div className="card__content flex flex-wrap items-center justify-center sm:justify-start gap-1 mt-4 mb-0">
            {member.skills.slice(0, 4).map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 dark:text-(--azul-ultramar) dark:glassmorphic transition-colors duration-200 py-1 px-2.5 select-none"
              >
                {skill}
              </Badge>
            ))}
            {member.skills.length > 4 && (
              <Badge
                variant="outline"
                className="text-xs dark:text-(--azul-ultramar) dark:border-white/30 dark:glassmorphic bg-blue-50 text-blue-700  py-1 select-none"
              >
                +{member.skills.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
