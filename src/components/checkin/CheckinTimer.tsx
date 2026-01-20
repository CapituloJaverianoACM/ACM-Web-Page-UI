import { Contest } from "@/models/contest.model";
import React from "react";
import Countdown from "react-countdown";
import EventCard from "@/components/league/ui/Events/event-card";
import toast, { Toaster } from "react-hot-toast";
import { checkInStudent } from "@/controllers/participation.controller";
import { useQueryClient } from "@tanstack/react-query";

interface CheckinTimerProps {
  contest: Contest;
}

const MINUTES_BEFORE_CHECKIN: number = 5;

export const CheckinTimer: React.FC<CheckinTimerProps> = ({ contest }) => {
  const deadline = new Date(contest.start_hour);
  deadline.setMinutes(deadline.getMinutes() - MINUTES_BEFORE_CHECKIN);
  const queryClient = useQueryClient();

  const handleCheckin = async () => {
    if (new Date() > deadline) {
      toast.error("Ya pasó la hora de check-in");
      return;
    }
    const result = await checkInStudent(contest.id);
    toast[result.ok ? "success" : "error"](result.msg);
    queryClient.invalidateQueries({ queryKey: ["league-contests"] });
  };

  return (
    <div>
      <Toaster position="bottom-center" />
      <div className="text-center font-semibold">
        <p className="text-xl">Tiempo antes del check-in</p>
      </div>
      <div className="text-center font-(family-name:--font-primary) text-4xl">
        <Countdown date={deadline}>
          <h1 className="text-4xl mb-0">00:00:00:00</h1>
        </Countdown>
      </div>
      <div className="p-5 flex items-center justify-center">
        <EventCard.RegisterButton
          className="w-[50%]"
          disabled={new Date() > deadline}
          onClick={handleCheckin}
        >
          Check-in
        </EventCard.RegisterButton>
      </div>
    </div>
  );
};
