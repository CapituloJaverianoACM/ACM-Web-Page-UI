import { useEffect, useState } from 'react';
import MemberCard, { Member } from '../MemberCard';
import MemberModal from '../MemberModal';

export function Members() {
    const [members, setMembers] = useState<Member[]>([]);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch('members.json')
            .then((res) => res.json())
            .then((data) => setMembers(data));
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
        <div id="members" className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center space-y-4 mb-10">
                <h1 className="dark:text-white">
                    Nuestro Equipo
                </h1>
                <p className="text-xl dark:text-white/80">
                    Conoce a los talentosos individuos que hacen que nuestro capítulo sea excepcional
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {members.map((member) => (
                    <MemberCard key={member.id} member={member} onClick={() => handleMemberClick(member)} />
                ))}
            </div>
            <MemberModal member={selectedMember} isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}