import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, User, Building } from 'lucide-react';
import { Member } from './MemberCard';
import { useState } from 'react';

interface MemberModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
}

const MemberModal = ({ member, isOpen, onClose }: MemberModalProps) => {
  const [imageError, setImageError] = useState(false);

  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Sobre {member.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-8 font-['Montserrat'] px-6 py-5 sm:p-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--azul-electrico)] to-[var(--azul-ultramar)] flex items-center justify-center shadow-lg border-2 border-[var(--azul-niebla)]/20 mx-auto md:mx-0 select-none">
                {member.image && !imageError ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    onError={() => setImageError(true)}
                    style={{ userSelect: "none" }}
                    draggable={false}
                  />
                ) : (
                  <User className="w-12 h-12 text-white/80" />
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold text-[var(--azul-noche)]">{member.name}</h2>
              <div className="flex items-center gap-2 text-[var(--azul-electrico)] justify-center md:justify-start">
                <Building className="w-4 h-4" />
                <span className="font-medium">{member.title}</span>
              </div>
              <div className="text-[var(--azul-ultramar)]">
                {member.rol}
              </div>
              <Button
                variant="outline"
                className="mt-4 hover:bg-[var(--azul-niebla)] hover:text-[var(--azul-electrico)] hover:border-[var(--azul-crayon)] transition-colors duration-200"
                onClick={() => window.open(`mailto:${member.email}`, '_blank')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contactar
              </Button>
            </div>
          </div>

          {/* Bio Section */}
          <div className="space-y-3 bg-[var(--azul-niebla)]/10 p-5 rounded-xl">
            <h3 className="text-lg font-semibold text-[var(--azul-noche)]">Acerca de</h3>
            <p className="text-[var(--azul-noche)]/80 leading-relaxed">
              {member.bio}
            </p>
          </div>

          {/* Skills Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--azul-noche)]">Habilidades & Experiencia</h3>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-[var(--azul-niebla)] text-[var(--azul-electrico)] hover:bg-[var(--azul-crayon)]/20 transition-colors duration-200 px-3 py-1"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemberModal;
