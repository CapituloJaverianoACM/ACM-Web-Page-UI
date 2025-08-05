import { Member } from "@/models/member.model";
import React, { MouseEventHandler } from "react";
import { Badge } from "@/components/home/ui/badge";
import { InactiveMemberImage } from "./inactive-member-image";
import { InactiveMemberBody } from "./inactive-member-body";

export interface InactiveMemberCardProps {
    member: Member;
    onClick: MouseEventHandler
}

export const InactiveMemberCard: React.FC<
    InactiveMemberCardProps
    > = ({
    member,
    onClick
}) => {

    return (
        <div key={member._id} className="relative flex items-start gap-4 w-[300px]" onClick={onClick}>
            <div className="flex-1">
                <div className="card flex-row p-md transition-all duration-300 hover:scale-[1.025] overflow-hidden">
                    {/* Imagen, info y botones en una fila */}
                    <div className="flex flex-row items-center justify-center gap-6">
                        {/* Imagen */}
                        <InactiveMemberImage member={member} />
                        {/* Contenido principal */}
                        <InactiveMemberBody member={member} />
                    </div>
                    {/* Skills */}
                    <div className="card__content flex flex-wrap items-center justify-center gap-1 mt-4 mb-0">
                        {member.skills.map((skill, i) => (
                            <Badge
                                key={i}
                                variant="secondary"
                                className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-xs px-2 py-0.5"
                            >
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
    );
};
