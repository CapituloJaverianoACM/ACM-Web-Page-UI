import React from "react";
import { InactiveMemberCardProps } from "./inactive-member-card";
import { Button } from "@/components/shared/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

export const InactiveMemberBody: React.FC<
  Pick<InactiveMemberCardProps, "member">
> = ({ member }) => {
  return (
    <div className="flex text-center md:text-start flex-col justify-center">
      <h3 className="card__title mb-0 text-base">{member.name}</h3>
      <div className="card__subtitle text-xs">{member.title}</div>
      <div className="text-xs text-blue-700 font-semibold mt-1">
        {member.role}
      </div>
      {/* Botones de contacto debajo del rol */}
      <div className="flex gap-2 mt-2 md:justify-start md:items-start justify-center items-center">
        <Button
          variant="outline"
          size="icon"
          className="p-0 btn--secondary btn--small"
          onClick={() => window.open(`mailto:${member.email}`, "_blank")}
        >
          <Mail className="w-3 h-3" />
        </Button>
        {member.linkedin && (
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 p-0 btn--secondary"
            onClick={() => window.open(member.linkedin, "_blank")}
          >
            <Linkedin className="w-3 h-3" />
          </Button>
        )}
        {member.github && (
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 p-0 btn--secondary"
            onClick={() => window.open(member.github, "_blank")}
          >
            <Github className="w-3 h-3" />
          </Button>
        )}
      </div>
    </div>
  );
};
