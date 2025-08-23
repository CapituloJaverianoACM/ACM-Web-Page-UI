import { Button } from "@/components/shared/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const InactiveMembersHeader = () => {
    return (
        <div className="flex items-center gap-4 p-10">
            <Link href="/">
                <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800">
                    <ArrowLeft className="w-8 h-8" />
                </Button>
            </Link>
            <div>
                <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Miembros Inactivos
                </h1>
                <p className="text-xl text-gray-600 dark:text-[var(--azul-niebla)] mt-2">
                    Línea de tiempo de miembros que ya no están activos
                </p>
            </div>
        </div>
    );
};
