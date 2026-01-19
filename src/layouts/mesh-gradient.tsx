import Image from "next/image";

type MeshGradientProps = React.PropsWithChildren<object>;
export const MeshGradient: React.FC<MeshGradientProps> = ({ children }) => {
  return (
    <div className="w-[100%] min-h-screen relative overflow-hidden">
      <Image
        className="object-cover z-[-1]"
        src="/mesh.png"
        alt="Background"
        fill={true}
        priority
      />
      <div className="relative z-0">{children}</div>
    </div>
  );
};
