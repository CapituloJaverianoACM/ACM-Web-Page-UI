import { ACMToast } from "@/components/shared/ui/toaster/acm-toast";
import {
  BadgeCheckIcon,
  MessageCircleWarningIcon,
  AlertCircleIcon,
  InfoIcon,
} from "lucide-react";
import { ReactNode } from "react";

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
  error: <AlertCircleIcon className="w-5 h-5" />,
  warn: <MessageCircleWarningIcon className="w-5 h-5" />,
  ok: <BadgeCheckIcon className="w-5 h-5" />,
  neutral: <InfoIcon className="w-5 h-5" />,
};

const ToastTypeAccentColor: Record<string, string> = {
  error: "bg-red-500 dark:bg-red-400",
  warn: "bg-yellow-500 dark:bg-yellow-400",
  ok: "bg-green-500 dark:bg-green-400",
  neutral: "bg-[var(--azul-electrico)] dark:bg-[var(--azul-crayon)]",
};

const ToastTypeIconColor: Record<string, string> = {
  error: "text-red-500 dark:text-red-400",
  warn: "text-yellow-500 dark:text-yellow-400",
  ok: "text-green-500 dark:text-green-400",
  neutral: "text-[var(--azul-electrico)] dark:text-[var(--azul-crayon)]",
};

export const showToast = (toast: any, options: ToastOptions) => {
  const accentColor = ToastTypeAccentColor[options.type];
  const iconColor = ToastTypeIconColor[options.type];
  const icon = ToastTypeLogo[options.type];

  toast.custom((t) => (
    <ACMToast toastInstance={t}>
      <div className="flex items-center gap-3 w-full -m-4 p-4 rounded-lg">
        {/* Acento lateral */}
        <div className={`w-1 h-12 rounded-full ${accentColor}`}></div>
        <div className={`shrink-0 ${iconColor}`}>{options.logo || icon}</div>
        <div className="flex-1">
          <p className="text-sm font-medium m-0 text-gray-900 dark:text-gray-100">
            {options.message}
          </p>
        </div>
      </div>
    </ACMToast>
  ));
};
