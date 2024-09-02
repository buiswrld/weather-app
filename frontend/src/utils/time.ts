/**
 * Returns the date and time in a specified format.
 * 
 * @param day - The Date object representing the day.
 * @param format12 - A boolean indicating whether to use 12-hour format.
 * @returns An object containing the formatted date and time as strings.
 *          Formatted as: { date: 'Weekday, Month Day, Year', time: 'HH:MM:SS AM/PM' }
 */
export const getDateTime = (day: Date, format12: boolean) => {
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: undefined,
    hour12: format12
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const date = day.toLocaleDateString('en-US', dateOptions)
  const time = day.toLocaleTimeString('en-US', timeOptions)

  return { date, time }
}


/**
 * Converts a time string from 24-hour format to 12-hour format.
 * 
 * @param time24 - The time string in "HH:MM" format.
 * @returns A string representing the time in 12-hour format with AM/PM.
 */
export const convert24To12Hour = (time24: string): string => {
  const [hour, minute] = time24.split(':').map(Number)

  if (isNaN(hour) || isNaN(minute)) {
    console.error(`Invalid time format: ${time24}`);
    return 'Invalid Time';
  }

  const period = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`
}

/**
 * Checks if the first time is earlier than the second time.
 * 
 * @param time1 - The first time string in "HH:MM" format.
 * @param time2 - The second time string in "HH:MM" format.
 * @returns A boolean indicating whether the first time is earlier than the second time.
 */
function isEarlier(time1: string, time2: string): boolean {
  const [time1Part, period1] = time1.split(' ')
  const [time2Part, period2] = time2.split(' ')

  const [hour1, minute1] = time1Part.split(':').map(Number)
  const [hour2, minute2] = time2Part.split(':').map(Number)

  if (period1 !== period2) {
    return period1 === 'AM'
  }

  if (hour1 !== hour2) {
    return hour1 < hour2
  }

  return minute1 < minute2
}

/**
 * Determines if the given time is during the daytime based on sunrise and sunset times.
 * 
 * @param time - The current time string in "HH:MM" format.
 * @param sunrise - The sunrise time string in "HH:MM" format.
 * @param sunset - The sunset time string in "HH:MM" format.
 * @returns A boolean indicating whether the given time is during the daytime.
 */
export function isDaytime(
  time: string,
  sunrise: string,
  sunset: string,
): boolean {
  return isEarlier(sunrise, time) && isEarlier(time, sunset)
}

/**
 * Floors the given time to the nearest hour.
 * 
 * @param time - The time string in "HH:MM" format.
 * @returns A string representing the time floored to the nearest hour in "HH:00" format.
 */
export function floorTimeToHour(time: string): string {
  const [hour]= time.split(':').map(Number)
  return `${hour.toString().padStart(2, '0')}:00`
}

/**
 * Returns an emoji representing the time of day based on the given time, sunrise, and sunset times.
 * 
 * @param time - The current time string in "HH:MM" format.
 * @param sunrise - The sunrise time string in "HH:MM" format.
 * @param sunset - The sunset time string in "HH:MM" format.
 * @returns A string representing an emoji for the time of day.
 */
export function getEmojiForTime(
  time: string,
  sunrise: string,
  sunset: string,
): string {
  sunrise = convert24To12Hour(floorTimeToHour(sunrise))
  sunset = convert24To12Hour(floorTimeToHour(sunset))
  if (time === sunrise) {
    return '🌅'
  }
  if (time === sunset) {
    return '🌇'
  }
  return isDaytime(time, sunrise, sunset) ? '☀️' : '🌙'
}

/**
 * Returns an array of the next five dates starting from today.
 * 
 * @returns An array of Date objects representing the next five dates.
 */
export const getNextFiveDates = (): Date[] => {
    const dates: Date[] = [];
    const today = new Date();
  
    for (let i = 1; i <= 5; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      dates.push(nextDate);
    }
  
    return dates;
  };