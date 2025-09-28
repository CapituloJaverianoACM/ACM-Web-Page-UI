export interface Participation {
  contest_id: number;
  student_id: number;
  position?: number | null;
  checkin: boolean;
}