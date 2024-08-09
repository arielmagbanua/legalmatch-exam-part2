// calculates the year difference between two dates
function getYearDifference(givenDate, referenceDate = new Date()) {
  // Ensure givenDate is a valid Date object
  if (!(givenDate instanceof Date)) {
    throw new Error('Invalid date data');
  }

  // Extract years from both dates
  const givenYear = givenDate.getFullYear();
  const currentYear = referenceDate.getFullYear();

  // Calculate the difference in years
  return currentYear - givenYear;
}

export {getYearDifference};
export default getYearDifference;
