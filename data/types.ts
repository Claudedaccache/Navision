import { Event } from "react-big-calendar";

type Activity = {
  [year: number]: {
    [month: number]: {
      [day: number]: {
        category?: string;
        location?: string;
        dayOff?: string;
        beforeNoon?: string;
        afternoon?: string;
      };
    };
  };
};

export type User = {
  id: string;
  name: string;
  familyName: string;
  manager: string;
  companyID: string;
  email: string;
  password: string;
  activity: Activity;
  notes: string;
  daysOff: Array<{
    title: string;
    date: string;
    duration: "Avant-Midi" | "Après-Midi" | "full";
  }>;
};

export type MissionType = {
  client: string;
  project: string;
  tache: string;
};

export interface CustomEvent extends Event {
  start: Date;
  end: Date;
  type: string;
  transportation: string;
  notes?: string;
  color: string;
}
export type TimeOption = "Journée Entière" | "Avant-Midi" | "Après-Midi";

export interface CalendarEvent {
  id: string | number;
  title: string;
  start: Date;
  end: Date;
  type: "Journée Entière" | "Avant-Midi" | "Après-Midi";
  transportation: string;
  notes?: string;
  color: string;
}
// export interface DayOff {
//   date: string;
//   title: string;
//   duration: "full" | "half";
// }

export type DayOff = {
  date: string;
  period: string;
  status: "sick" | "vacation" | "other";
  note?: string;
};

export interface NewEventState {
  id: string | number;
  title: string;
  date: string;
  timeOption: TimeOption;
  missionType: MissionType;
  transportation: string;
  notes: string;
}
