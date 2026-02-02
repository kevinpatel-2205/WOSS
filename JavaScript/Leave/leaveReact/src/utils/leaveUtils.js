const TOTAL_LEAVE = 12;

const holidays = [
  "2026-01-01",
  "2026-01-14",
  "2026-01-26",
  "2026-03-08",
  "2026-03-29",
  "2026-04-14",
  "2026-05-01",
  "2026-08-15",
  "2026-10-02",
  "2026-12-30",
  "2027-01-05",
].map((d) => new Date(d).toDateString());

const isWeekend = (date) => date.getDay() === 0 || date.getDay() === 6;
const isHoliday = (date) => holidays.includes(date.toDateString());
const isHolidayOrWeekend = (date) => isWeekend(date) || isHoliday(date);

export function calculateLeave(startDateStr, endDateStr) {
  let startDate = new Date(startDateStr);
  let endDate = new Date(endDateStr);

  startDate = new Date(startDate.toDateString());
  endDate = new Date(endDate.toDateString());

  const today = new Date(new Date().toDateString());

  if (startDate < today || endDate < today || startDate > endDate) {
    return { approved: false, message: "Invalid Date Range" };
  }

  if (isWeekend(startDate) || isWeekend(endDate)) {
    return { approved: false, message: "Leave cannot start or end on weekend" };
  }

  if (isHoliday(startDate) || isHoliday(endDate)) {
    return { approved: false, message: "Leave cannot start or end on holiday" };
  }

  let days = 0;

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    if (!isHolidayOrWeekend(d)) days++;
  }

  return {
    approved: true,
    days,
    message: "Leave Calculated",
  };
}

export function requestLeave(startDate, endDate, existingLeaves) {
  const result = calculateLeave(startDate, endDate);
  if (!result.approved) return result;

  let usedCasual = existingLeaves.reduce((acc, leave) => {
    if (!leave.approved) return acc;
    return acc + (leave.casualLeave || 0);
  }, 0);

  const casualAvailable = Math.max(TOTAL_LEAVE - usedCasual, 0);
  const casualLeave = Math.min(result.days, casualAvailable);
  const paidLeave = result.days - casualLeave;

  return {
    approved: true,
    message: "Leave Approved",
    casualLeave,
    paidLeave,
    days: result.days,
  };
}
