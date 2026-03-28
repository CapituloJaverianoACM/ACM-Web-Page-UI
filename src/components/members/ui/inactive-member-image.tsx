import { useState } from "react";
import { InactiveMemberCardProps } from "./inactive-member-card";
import Image from "next/image";
import { User } from "lucide-react";

export const InactiveMemberImage: React.FC<
  Pick<InactiveMemberCardProps, "member">
> = ({ member }) => {
  const [imageError, setImageError] = useState(false);
  return (
    <div
      className="shrink-0 bg-azul-electrico dark:bg-blue-600 radius border-azul-electrico border-3 overflow-hidden flex items-center justify-center"
      style={{
        width: "120px",
        height: "120px",
        borderRadius: "var(--radius-md)",
      }}
    >
      {member.image && !imageError ? (
        <Image
          src={member.image}
          alt={member.name}
          width={120}
          height={120}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top"
          draggable={false}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full dark:bg-blue-600">
          <User className="w-8 h-8 text-white" />
        </div>
      )}
    </div>
  );
};
