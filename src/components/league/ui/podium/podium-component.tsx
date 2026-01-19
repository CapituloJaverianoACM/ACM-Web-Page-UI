import { Student } from "@/models/student.model";
import { IconCrown } from "@tabler/icons-react";
import { ReactNode } from "react";

const Container = (props: {
  steps_count: number;
  className?: string;
  steps: {
    order: number;
    children: ReactNode;
  }[];
}) => {
  const { steps_count, className = "", steps } = props;

  return (
    <div className={`flex gap-3 h-full w-full items-end ${className}`}>
      {steps.map((step) => {
        return (
          <div
            style={{
              height: `${((0.8 / steps_count) * (steps_count - step.order) + 0.2) * 100}%`,
            }}
            className="grow flex-1"
            key={step.order}
          >
            {step.children}
          </div>
        );
      })}
    </div>
  );
};

const Step = (props: {
  className?: string;
  bg_color: string;
  student: {
    student: Student;
    order: number;
  };
  showNumber?: boolean;
  showAvatar?: boolean;
  showUserInfo?: boolean;
  showCrown?: boolean;
}) => {
  const {
    bg_color = "#000",
    className = "",
    student,
    showNumber = false,
    showAvatar = false,
    showUserInfo = false,
    showCrown = false,
  } = props;

  const val = 1 - student.order * 0.25;

  const roundedDirection =
    student.order == 0 ? "rounded-tl-[8rem]" : "rounded-tr-[8rem]";

  return (
    <div className="flex flex-col gap-2 w-full h-full relative transition hover:scale-105 cursor-pointer">
      <div className="relative flex flex-col items-center justify-center grow overflow-hidden">
        {/* Fondo */}
        <div
          className={`absolute inset-0 shadow-md flex flex-col items-center justify-end ${bg_color} ${roundedDirection} ${className}`}
          style={{
            filter: `brightness(${val})`,
          }}
        ></div>

        <div className="absolute h-full flex flex-col gap-2 items-center justify-end z-10">
          {showNumber && (
            <b className="relative z-10 text-6xl text-white text-bold font-(--font-primary)">
              #{student.order + 1}
            </b>
          )}
          {showUserInfo && (
            <div className=" text-white flex flex-col items-center justify-center p-2 text-center text-xs lg:text-base shadow font-(--font-secondary)">
              <p
                className="m-0"
                title={`${student.student.name} ${student.student.surname}`}
              >
                {student.student.name}
              </p>
              <p className="m-0 flex gap-1 items-center">
                {" "}
                <IconCrown className="text-yellow-500" size={15} />
                {student.student.victory_count}{" "}
                <span className="hidden lg:flex">Victorias</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {showAvatar &&
        (() => {
          const hasAvatar = !(
            student.student.avatar?.length == 0 || !student.student.avatar
          );
          return (
            <div className="flex absolute -top-8 lg:-top-14 left-1/2 transform -translate-x-1/2 mx-auto rounded-full border-2 border-(--azul-niebla) bg-(--azul-niebla) h-16 lg:h-28 aspect-square overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  hasAvatar
                    ? student.student.avatar
                    : process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL
                }
                alt={`Avatar de ${student.student.name}`}
                className={`object-cover ${hasAvatar ? "w-full h-full" : "w-3/4 h-3/4 m-auto"}`}
              />
            </div>
          );
        })()}

      {showCrown && (
        <div
          className={`absolute z-10 -top-14 lg:-top-22 left-[40%] transform -translate-x-1/2 -rotate-12 lg:-rotate-24 ${student.order == 0 ? "text-yellow-500" : student.order == 1 ? "text-neutral-300" : "text-amber-600"}`}
        >
          <IconCrown className="hidden lg:flex" size={65} />
          <IconCrown className="flex lg:hidden" size={45} />
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Step,
  Container,
};
