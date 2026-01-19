import { Card, CardContent } from "../../shared/ui/card";
import LogoLoader from "@/components/shared/ui/logo-loader/loader";

export const MemberLoaderCard = () => {
  return (
    <Card className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-4 rounded-2xl overflow-hidden border-0 shadow-lg aspect-[3/4] relative mx-auto max-w-sm w-full glass-noise dark:glass-noise-dark">
      <CardContent className="p-0 h-full relative flex items-center justify-center">
        <LogoLoader size={175} />
      </CardContent>
    </Card>
  );
};
