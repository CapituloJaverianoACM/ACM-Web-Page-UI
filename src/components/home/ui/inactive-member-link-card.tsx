import Link from "next/link";
import { Users } from "lucide-react";
import { Card, CardContent } from "../../shared/ui/card";

export const InactiveMembersLinkCard = () => {
  return (
    <Link href="/inactive-members" className="group">
      <Card className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-4 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 shadow-lg aspect-[3/4] relative mx-auto max-w-sm w-full dark:bg-gray-900/80">
        <CardContent className="p-0 h-full relative flex flex-col items-center justify-end text-center">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center transition-colors duration-300 mb-4">
              <Users className="w-10 h-10 text-gray-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-700 dark:text-white transition-colors duration-200 italic">
                Ver Miembros Inactivos
              </h3>
              <p className="text-gray-500 dark:text-gray-200 text-sm px-4">
                Consulta la lista de miembros que ya no están activos
              </p>
            </div>
          </div>
          {/* Overlay para efecto hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </CardContent>
      </Card>
    </Link>
  );
};
