import { Store, TypeAction } from './types';
import {
  getCountDaysToEnd,
  updateEndDate,
  updateTime,
} from './utils/getDateTime';
const currentDate = new Date();
const today = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate(),
  0,
  0,
  0,
);

export const initialStore = {
  typeOfHours: 60,
  countOfHours: 0,
  hoursInDay: 0,
  days: [],
  breakMinTime: 0,
  date: { start: today, end: today },
  time: { start: today, end: today },
  room: null,
  teacher: null,
};

export interface Action {
  type: TypeAction;
  payload: Partial<Store>;
}

export const reducer = (store: Store, action: Action) => {
  switch (action.type) {
    case TypeAction.UPDATE_TYPE_OF_HOURS: {
      const { hoursInDay, breakMinTime, time, ...data } = store;
      const typeOfHours = action.payload.typeOfHours || 60;
      const endTime = updateTime({
        startTime: time.start,
        hoursInDay,
        breakMinTime,
        typeOfHours,
      });
      return {
        ...data,
        hoursInDay,
        breakMinTime,
        typeOfHours,
        time: { start: time.start, end: endTime },
      };
    }
    case TypeAction.UPDATE_COUNT_OF_HOURS: {
      const { days, hoursInDay, date, ...data } = store;
      const countOfHours = action.payload.countOfHours || 0;
      const countDays = getCountDaysToEnd({
        days,
        countOfHours,
        hoursInDay,
        date,
      });
      const endDate = updateEndDate(countDays, date);

      return {
        ...data,
        days,
        countOfHours,
        hoursInDay,
        date: { start: date.start, end: endDate },
      };
    }
    case TypeAction.UPDATE_HOURS_IN_DAY: {
      const {
        days,
        date,
        countOfHours,
        time,
        breakMinTime,
        typeOfHours,
        ...data
      } = store;

      const hoursInDay = action.payload.hoursInDay || 0;
      const countDays = getCountDaysToEnd({
        days,
        countOfHours,
        hoursInDay,
        date,
      });

      const endDate = updateEndDate(countDays, date);
      const endTime = updateTime({
        startTime: time.start,
        hoursInDay,
        breakMinTime,
        typeOfHours,
      });

      return {
        ...data,
        days,
        countOfHours,
        hoursInDay,
        breakMinTime,
        typeOfHours,
        date: { start: date.start, end: endDate },
        time: { start: time.start, end: endTime },
      };
    }
    case TypeAction.UPDATE_DAYS: {
      const { date, hoursInDay, countOfHours, ...data } = store;
      const days = action.payload.days || [];
      const countDays = getCountDaysToEnd({
        days,
        countOfHours,
        hoursInDay,
        date,
      });
      const endDate = updateEndDate(countDays, date);

      return {
        ...data,
        days,
        countOfHours,
        hoursInDay,
        date: { start: date.start, end: endDate },
      };
    }
    case TypeAction.UPDATE_BREAK_MIN_TIME: {
      const { hoursInDay, typeOfHours, time, ...data } = store;
      const breakMinTime = action.payload.breakMinTime || 0;
      const endTime = updateTime({
        startTime: time.start,
        hoursInDay,
        breakMinTime,
        typeOfHours,
      });
      return {
        ...data,
        hoursInDay,
        breakMinTime,
        typeOfHours,
        time: { start: time.start, end: endTime },
      };
    }
    case TypeAction.UPDATE_ROOM: {
      return { ...store, room: action.payload.room || '' };
    }
    case TypeAction.UPDATE_TEACHER: {
      return { ...store, teacher: action.payload.teacher || '' };
    }
    case TypeAction.UPDATE_TIME: {
      return {
        ...store,
        time: action.payload.time || { start: null, end: null },
      };
    }
    case TypeAction.UPDATE_DATE: {
      const { days, hoursInDay, countOfHours, ...data } = store;
      const date = action.payload.date || { start: null, end: null };
      const countDays = getCountDaysToEnd({
        days,
        countOfHours,
        hoursInDay,
        date,
      });
      const endDate = updateEndDate(countDays, date);
      return {
        ...data,
        days,
        countOfHours,
        hoursInDay,
        date: { start: date.start, end: endDate },
      };
    }
    default:
      return store;
  }
};
