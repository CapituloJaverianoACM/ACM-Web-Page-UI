import Image from "next/image";

type MeshGradientProps = React.PropsWithChildren<object>;
export const MeshGradient: React.FC<MeshGradientProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-gray-300 relative overflow-hidden">
      {/*<Image
        className="object-cover z-0"
        src="/mesh.png"
        alt="Background"
        fill={true}
        priority
      />*/}
      <div className="relative z-1">{children}</div>
    </div>
  );
};
