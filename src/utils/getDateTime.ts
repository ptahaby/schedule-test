export const getCountDaysToEnd = (options: {
  days: Array<number>;
  countOfHours: number;
  hoursInDay: number;
  date: { start: Date | null; end: Date | null };
}) => {
  const { days, countOfHours, hoursInDay, date } = options;

  if (days.length === 0 || hoursInDay === 0 || countOfHours === 0) {
    return 0;
  }

  const startDay = date?.start ? date.start.getDay() || 7 : 0;
  let nextLessons = days.filter((i) => i >= startDay);

  if (hoursInDay >= countOfHours) {
    return nextLessons.length
      ? nextLessons[0] - startDay
      : 7 - startDay + days[0];
  }

  let counter = 0;
  let countOfLessons =
    Math.ceil(countOfHours / hoursInDay) - nextLessons.length;

  while (countOfLessons > 0) {
    nextLessons = nextLessons.concat(days.slice(0, countOfLessons));
    countOfLessons -= days.length;
  }

  nextLessons.unshift(startDay);
  for (let i = 1; i <= nextLessons.length - 1; i++) {
    if (nextLessons[i] === nextLessons[i - 1] && i - 1 !== 0) {
      counter += 7;
    } else if (nextLessons[i - 1] > nextLessons[i]) {
      counter += 7 - nextLessons[i - 1] + nextLessons[i];
    } else {
      counter += nextLessons[i] - nextLessons[i - 1];
    }
  }

  return counter;
};

export const updateEndDate = (
  countOfDays: number,
  date: { start: Date | null; end: Date | null },
) => {
  const currentDate = date.start ? new Date(date.start.getTime()) : new Date();

  currentDate.setDate(currentDate.getDate() + countOfDays);
  return currentDate;
};

export const updateTime = (options: {
  startTime: Date | null;
  hoursInDay: number;
  typeOfHours: number;
  breakMinTime: number;
}) => {
  const { startTime, hoursInDay, typeOfHours, breakMinTime } = options;
  if (!startTime) return new Date();

  return new Date(
    startTime.getTime() + (hoursInDay * typeOfHours + breakMinTime) * 60 * 1000,
  );
};
