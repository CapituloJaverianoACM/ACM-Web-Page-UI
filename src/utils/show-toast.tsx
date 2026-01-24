import { ACMToast } from "@/components/shared/ui/toaster/acm-toast";
import { BadgeCheckIcon, MessageCircleWarningIcon } from "lucide-react";
import { ReactNode } from "react";
import { ErrorIcon } from "react-hot-toast";

export enum ToastType {
  ERROR = "error",
  WARN = "warn",
  OK = "ok",
  NEUTRAL = "neutral",
}
export type ToastOptions = {
  type: ToastType;
  message: string;
  logo?: ReactNode;
};

const ToastTypeLogo: Record<string, ReactNode> = {
  error: <ErrorIcon />,
  warn: <MessageCircleWarningIcon />,
  ok: <BadgeCheckIcon />,
};

const ToastTypeColor: Record<string, string> = {
  error: "text-red-500",
  warn: "text-yellow-500",
  ok: "text-green-500",
  neutral: "text-black",
};

export const showToast = (toast: any, options: ToastOptions) => {
  const color = ToastTypeColor[options.type];
  toast.custom((t) => (
    <ACMToast toastInstance={t}>
      <div className={`flex items-center`}>
        <div>
          <p className={`text-center m-0 px-3 font-semibold ${color}`}>
            {options.message}
          </p>
        </div>
        <div className="px-2">{options.logo ? options.logo : ""}</div>
      </div>
    </ACMToast>
  ));
};
