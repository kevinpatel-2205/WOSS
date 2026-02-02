export function isSameDate(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

export const holidays = [
  new Date("2026-01-01"),
  // new Date("2026-01-30"),
  new Date("2026-01-26"),
  new Date("2026-02-04"),
  new Date("2026-02-11"),
  new Date("2026-04-14"),
  new Date("2026-05-01"),
  new Date("2026-08-15"),
  new Date("2026-10-02"),
  new Date("2026-10-24"),
  new Date("2026-12-25")
];

export const isWeekend = (date) => {
  const day = date.getDay()
  return day === 0 || day === 6
}

export const isHolidayOrWeekend = (date) => {
  return (
    isWeekend(date) ||
    holidays.some(h => isSameDate(h, date))
  )
}

export const isHoliday = (date) => {
  return (
    holidays.some(h => isSameDate(h, date))
  )
}
