import toast, { Toast } from "react-hot-toast";
import { X } from "lucide-react";

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
      } max-w-md w-full bg-white dark:bg-[#1a1a1a] shadow-2xl rounded-xl pointer-events-auto flex ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-sm border border-gray-200 dark:border-gray-700`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-center text-gray-900 dark:text-gray-100">
          {children}
        </div>
      </div>
      <div className="flex items-center pr-2">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="rounded-lg p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-(--azul-electrico) transition-all"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export { ACMToast };
