"use client"
import Confetti from "@/components/shared/ui/confetti";
import { AuthLayout } from "./auth_layout";
import { CardContent, CardTitle, Card, CardHeader} from "@/components/shared/ui/card";

type SimpleConfettiLayoutProps = {
    title: string
};

const SimpleConfettiLayout: React.FC<
  React.PropsWithChildren<SimpleConfettiLayoutProps>
> = ({ children, title }) => {
  return (
    <AuthLayout>
      <Confetti />
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center dark:text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </AuthLayout>
  );
};

export { SimpleConfettiLayout };
