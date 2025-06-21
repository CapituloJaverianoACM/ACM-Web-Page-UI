import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import Image, {ImageProps} from "next/image";
import { cn } from "@/utils/cn";

export interface Member {
    id: string;
    name: string;
    title: string;
    rol: string;
    email: string;
    bio: string;
    skills: string[];
    image?: string;
}

interface MemberCardProps {
    member: Member;
    onClick: (member: Member) => void;
}

const MemberCard = ({ member, onClick }: MemberCardProps) => {
    const [imageError, setImageError] = useState(false);

    return (
        <Card
            className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-4 rounded-2xl overflow-hidden border-0 bg-[var(--azul-electrico)] shadow-lg aspect-[3/4] relative mx-auto max-w-sm w-full"
            style={{
                background:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='1' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noise)'/></svg>\"), var(--azul-electrico)",
                backgroundBlendMode: "soft-light",
            }}
            onClick={() => onClick(member)}
        >
            <CardContent className="p-0 h-full relative">
                {/* Background Image with Parallax Effect */}
                <div className="absolute inset-0 overflow-hidden">
                    {member.image && !imageError ? (
                        <div className="relative w-full h-full">
                            <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={1000}
                                    height={1000}
                                    loading="lazy"
                                    decoding="async"
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5/6 object-cover"
                                    onError={() => setImageError(true)}
                                    style={{ userSelect: "none" }}
                                    draggable={false}
                                />

                                {/* Radial Gradient that uses image as mask */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: `radial-gradient(circle at center bottom, var(--azul-crayon) 30%, transparent 60%)`,
                                        mixBlendMode: "multiply",
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br">
                            <User className="w-16 h-16 text-white/80" />
                        </div>
                    )}
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7 text-white">
                    <div className="transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                        <h3 className="text-2xl font-bold mb-1 text-[var(--azul-niebla)] transition-colors duration-200 line-clamp-2 italic">
                            {member.name}
                        </h3>
                        <p className="text-[var(--azul-niebla)] font-medium text-sm mb-1 font-['Montserrat'] line-clamp-1">
                            {member.title}
                        </p>
                        <p className="text-gray-200 text-sm mb-4 font-['Montserrat'] line-clamp-1">
                            {member.rol}
                        </p>

                        {/* Skills Preview */}
                        <div className="flex flex-wrap gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity duration-200">
                            {member.skills.slice(0, 2).map((skill, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs bg-[var(--azul-niebla)]/20 text-white bg-[var(--azul-niebla)]/30 transition-colors duration-200 glassmorphic py-1 px-2.5 select-none"
                                >
                                    {skill}
                                </Badge>
                            ))}
                            {member.skills.length > 2 && (
                                <Badge
                                    variant="outline"
                                    className="text-xs text-white/80 border-white/30 py-1 px-2.5 select-none"
                                >
                                    +{member.skills.length - 2}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--azul-ultramar)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </CardContent>
        </Card>
    );
};

export default MemberCard;
