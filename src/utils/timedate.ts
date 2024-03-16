export function daysFromNow(unixTimestamp: number): number {
  // Get the current timestamp in milliseconds
  const now = Date.now();

  // Convert the Unix timestamp from seconds to milliseconds
  const timestampInMs = unixTimestamp * 1000;

  // Calculate the difference in milliseconds
  const diff = timestampInMs - now;

  // Convert the difference from milliseconds to days
  const diffInDays = diff / (1000 * 60 * 60 * 24);

  // Return the number of days, rounded to the nearest whole number
  return Math.round(diffInDays);
}
