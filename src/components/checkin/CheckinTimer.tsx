import { Contest } from "@/models/contest.model";
import React from "react";
import Countdown from "react-countdown";
import EventCard from "@/components/league/ui/Events/event-card";
import toast, { Toaster } from "react-hot-toast";
import { checkInStudent } from "@/controllers/participation.controller";
import { useQueryClient } from "@tanstack/react-query";
import { useLoadingAction } from "@/hooks/use-loading-action";
import LogoLoader from "@/components/shared/ui/logo-loader/loader";
import { showToast, ToastType } from "@/utils/show-toast";

interface CheckinTimerProps {
  contest: Contest;
}

const MINUTES_BEFORE_CHECKIN: number = 5;

export const CheckinTimer: React.FC<CheckinTimerProps> = ({ contest }) => {
  const deadline = new Date(contest.start_hour);
  deadline.setMinutes(deadline.getMinutes() - MINUTES_BEFORE_CHECKIN);
  const queryClient = useQueryClient();

  const handleCheckinAction = async () => {
    if (new Date() > deadline) {
      showToast(toast, {
        type: ToastType.ERROR,
        message: "Ya pasó la hora de check-in",
      });
      return;
    }
    const result = await checkInStudent(contest.id);
    showToast(toast, {
      type: result.ok ? ToastType.OK : ToastType.ERROR,
      message: result.msg,
    });
    queryClient.invalidateQueries({ queryKey: ["league-contests"] });
    queryClient.invalidateQueries({ queryKey: ["contests"] });
  };

  const { run: handleCheckin, isLoading: isCheckingIn } =
    useLoadingAction(handleCheckinAction);

  return (
    <div>
      <div className="text-center font-semibold">
        <p className="text-xl">Haz check-in antes de que empiece el contest</p>
      </div>
      <div className="text-center font-(family-name:--font-primary) text-4xl">
        <Countdown date={deadline}>
          <h1 className="text-4xl mb-0">00:00:00:00</h1>
        </Countdown>
      </div>
      <div className="p-5 flex items-center justify-center">
        <EventCard.RegisterButton
          className="w-[50%]"
          disabled={new Date() > deadline || isCheckingIn}
          onClick={handleCheckin}
        >
          {isCheckingIn ? (
            <div className="flex items-center justify-center gap-2">
              <LogoLoader size={20} />
              Haciendo check-in...
            </div>
          ) : (
            "Check-in"
          )}
        </EventCard.RegisterButton>
      </div>
    </div>
  );
};
