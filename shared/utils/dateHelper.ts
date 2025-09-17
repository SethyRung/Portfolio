export const calculateDuration = (startDate: Date, endDate: Date) => {
  let years = endDate.getFullYear() - startDate.getFullYear();

  let months = endDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (endDate.getDate() < startDate.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }

  let result = "";

  if (years > 0) {
    result += years + " year" + (years > 1 ? "s" : "");
    if (months > 0) result += " ";
  }

  if (months > 0 || years === 0) {
    result += months + " month" + (months > 1 ? "s" : "");
  }

  return result.trim();
};

export const isCurrentDate = (dateToCheck: Date) => {
  const today = new Date();

  return (
    dateToCheck.getDate() === today.getDate() &&
    dateToCheck.getMonth() === today.getMonth() &&
    dateToCheck.getFullYear() === today.getFullYear()
  );
};
