export type TSchedule = {
  id?: number;
  schedule_type: string;
  schedule_name: string;
  boot_time: string;
  stop_time: string;
  week?: number[];
  schedule_state?: boolean;
  schedule_note: string;
  editor: string;
  edit_time: string;
};

export type TPointList = {
  id: number;
  point_name: string;
  point_type: string;
};
