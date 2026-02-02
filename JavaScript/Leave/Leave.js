let startDate = new Date("2026-12-25");
let endDate = new Date("2027-01-29");
let totalLeave = 12;

function Leave(startDate, endDate) {
  startDate = new Date(startDate.toDateString());
  endDate = new Date(endDate.toDateString());

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

  const today = new Date(new Date().toDateString());

  const isWeekend = (date) => date.getDay() === 0 || date.getDay() === 6;
  const isHoliday = (date) => holidays.includes(date.toDateString());
  const isHolidayOrWeekend = (date) => isWeekend(date) || isHoliday(date);

  if (startDate < today || endDate < today || startDate > endDate) {
    return "Invalid Date Range";
  }

  if (isWeekend(startDate) || isWeekend(endDate)) {
    return "Leave cannot start or end on weekend";
  }

  if (isHoliday(startDate) || isHoliday(endDate)) {
    return "Leave cannot start or end on holiday";
  }

  const prevDay = new Date(startDate);
  prevDay.setDate(prevDay.getDate() - 1);

  const nextDay = new Date(endDate);
  nextDay.setDate(nextDay.getDate() + 1);

  const isSandwichLeave =
    (isHoliday(prevDay) && (isHoliday(nextDay) || isWeekend(nextDay))) ||
    (isHoliday(nextDay) && isWeekend(prevDay));

  let actualLeaveCount = 0;

  let fromDate = isSandwichLeave ? prevDay : startDate;
  let toDate = isSandwichLeave ? nextDay : endDate;

  for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
    if (isSandwichLeave) {
      actualLeaveCount++;
    } else {
      if (!isHolidayOrWeekend(d)) {
        actualLeaveCount++;
      }
    }
  }

  let currentYear = fromDate.getFullYear();
  let remainingLeave = totalLeave;

  const leaveByYear = {};

  for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
    if (!isSandwichLeave && isHolidayOrWeekend(d)) continue;

    const year = d.getFullYear();

    if (year !== currentYear) {
      const carriedForward = remainingLeave;

      remainingLeave = totalLeave + carriedForward;
      console.log(
        `carriedForward leave from ${currentYear} to ${year} is ${carriedForward} Leave`,
      );
      console.log(`for year ${year} total Leave is ${remainingLeave}`);

      currentYear = year;
    }

    if (remainingLeave <= 0) {
      return `Leave limit exceeded for year ${year}`;
    }

    remainingLeave--;

    leaveByYear[year] = (leaveByYear[year] || 0) + 1;
  }

  return `Effective Leave Days => ${actualLeaveCount}
Year-wise Leave: ${JSON.stringify(leaveByYear)}`;
}

console.log(Leave(startDate, endDate));
