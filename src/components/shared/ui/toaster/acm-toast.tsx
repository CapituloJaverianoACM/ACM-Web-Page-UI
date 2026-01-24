import Image from "next/image";
import toast, { Toast } from "react-hot-toast";

type ACMToastProps = {
  toastInstance: Toast;
};

const ACMToast: React.FC<React.PropsWithChildren<ACMToastProps>> = ({
  children,
  toastInstance: t,
}: React.PropsWithChildren<ACMToastProps>) => {
  return (
    <div
      className={`${
        t.visible ? "animate-appearance-in" : "animate-appearance-out"
      } max-w-md w-full bg-white shadow-lg rounded-sm pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-center">
          <div className="w-1/4">
            <Image width={100} height={100} src={"/Logo_Oscuro.svg"} alt="" />
          </div>
          <div className="w-3/4">{children}</div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="font-semibold w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export { ACMToast };
