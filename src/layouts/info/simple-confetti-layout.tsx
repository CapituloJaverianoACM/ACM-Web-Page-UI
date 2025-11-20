"use client";
import Confetti from "@/components/shared/ui/confetti";
import { AuthLayout } from "./auth_layout";
import {
  CardContent,
  CardTitle,
  Card,
  CardHeader,
} from "@/components/shared/ui/card";

type SimpleConfettiLayoutProps = {
  title: string;
};

const SimpleConfettiLayout: React.FC<
  React.PropsWithChildren<SimpleConfettiLayoutProps>
> = ({ children, title }) => {
  return (
    <AuthLayout>
      <Confetti />
      <Card className="w-full max-w-md bg-white dark:bg-[#1a1a1a] border-0 shadow-2xl rounded-2xl overflow-hidden">
        {/* Barra superior con gradiente */}
        <div
          className="h-2 w-full"
          style={{
            background:
              "linear-gradient(to right, var(--azul-electrico), var(--azul-crayon))",
          }}
        ></div>

        <CardHeader className="text-center pb-6 pt-8">
          <CardTitle className="text-3xl font-bold text-[var(--azul-noche)] dark:text-white mb-3">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">{children}</CardContent>
      </Card>
    </AuthLayout>
  );
};

export { SimpleConfettiLayout };
