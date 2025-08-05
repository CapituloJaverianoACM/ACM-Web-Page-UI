"use client";

import { useEffect, useState } from "react";
import MemberCard from "../member-card";
import MemberModal from "../member-modal";
import { Member } from "@/models/member.model";
import { getMembersService } from "@/services/member.service";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Users } from "lucide-react";

export function Members() {
    const [members, setMembers] = useState<Member[]>([]);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getMembersService().then((data) => setMembers(data));
        console.log("Members:", members);
    }, []);

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
                {members.filter(member => member.active).map((member) => (
                    <MemberCard
                        key={member._id}
                        member={member}
                        onClick={() => handleMemberClick(member)}
                    />
                ))}
                {/* Inactive Members Card */}
                <Link href="/inactive-members" className="group">
                    <Card className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-4 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 shadow-lg aspect-[3/4] relative mx-auto max-w-sm w-full">
                        <CardContent className="p-0 h-full relative flex flex-col items-center justify-end text-center">
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center group-hover:bg-gray-300 transition-colors duration-300 mb-4">
                                    <Users className="w-10 h-10 text-gray-500" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-gray-700 group-hover:text-gray-900 transition-colors duration-200 italic">
                                        Ver Miembros Inactivos
                                    </h3>
                                    <p className="text-gray-500 text-sm px-4">
                                        Consulta la lista de miembros que ya no están activos
                                    </p>
                                </div>
                            </div>
                            {/* Overlay para efecto hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </CardContent>
                    </Card>
                </Link>
            </div>
            <MemberModal
                member={selectedMember}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
}
