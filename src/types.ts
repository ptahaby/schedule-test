export type DropdownItem = {
  value: number | string;
  label: string;
};

export type Store = {
  typeOfHours: number;
  countOfHours: number;
  hoursInDay: number;
  days: Array<number>;
  breakMinTime: number;
  room: string | null;
  teacher: string | null;
  date: { start: Date | null; end: Date | null };
  time: { start: Date | null; end: Date | null };
};

export enum TypeAction {
  UPDATE_TYPE_OF_HOURS = 'UPDATE_TYPE_OF_HOURS',
  UPDATE_COUNT_OF_HOURS = 'UPDATE_COUNT_OF_HOURS',
  UPDATE_HOURS_IN_DAY = 'UPDATE_HOURS_IN_DAY',
  UPDATE_DAYS = 'UPDATE_DAYS',
  UPDATE_BREAK_MIN_TIME = 'UPDATE_BREAK_MIN_TIME',
  UPDATE_ROOM = 'UPDATE_ROOM',
  UPDATE_TEACHER = 'UPDATE_TEACHER',
  UPDATE_DATE = 'UPDATE_DATE',
  UPDATE_TIME = 'UPDATE_TIME',
}

export type OnChangeDispatch = (
  type: TypeAction,
  payload: Partial<Store>,
) => void;
