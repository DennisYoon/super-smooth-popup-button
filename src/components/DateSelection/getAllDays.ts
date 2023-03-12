type DayOfTheWeek = "월" | "화" | "수" | "목" | "금" | "토" | "일";

interface Day {
  num: number;
  dayOfTheWeek: DayOfTheWeek;
}

function getAllDays(year: number, month: number): Day[] {
  return [{num: 1, dayOfTheWeek: "금"}];
}

export { getAllDays };