export const getDateTime = (day: Date) => {
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: undefined,
    hour12: true,
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

export const convert24To12Hour = (time24: string): string => {
  const [hour, minute] = time24.split(':').map(Number)
  const period = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`
}

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

export function isDaytime(
  time: string,
  sunrise: string,
  sunset: string,
): boolean {
  return isEarlier(sunrise, time) && isEarlier(time, sunset)
}

export function floorTimeToHour(time: string): string {
  const [hour, minute]= time.split(':').map(Number)
  return `${hour.toString().padStart(2, '0')}:00`
}

export function getEmojiForTime(
  time: string,
  sunrise: string,
  sunset: string,
): string {
  sunrise = floorTimeToHour(sunrise)
  sunset = floorTimeToHour(sunset)
  if (time === sunrise) {
    return '🌅'
  }
  if (time === sunset) {
    return '🌇'
  }
  return isDaytime(time, sunrise, sunset) ? '☀️' : '🌙'
}
