/**
 * 🌌 Indian Standard Time (IST = UTC + 5:30) & Birthday Cycle Utilities
 * Target: November 30 (Celebrated every November 30)
 * Timezone: Asia/Kolkata (IST = UTC + 5:30)
 * 
 * Gregorian Leap Year Logic:
 *  - Divisible by 4 AND NOT divisible by 100, OR divisible by 400.
 *  - Leap year = 366 days (Feb 29). Normal year = 365 days.
 * 
 * Birthday Cycle Logic:
 *  - Normal year = 365 flowers. Leap year = 366 flowers.
 *  - November 29 represents the final day before the birthday bloom (364 of 365, or 365 of 366 in leap year).
 *  - November 30 triggers the full birthday bloom (all 365 or 366 flowers bloom).
 *  - On December 1, Birthday Mode concludes, but the completed garden remains visible in its completed state (365 or 366 flowers).
 */

/**
 * Determines whether a given year is a Gregorian leap year.
 * @param {number} year - Four-digit year
 * @returns {boolean}
 */
export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Returns total days in the given Gregorian year (365 or 366).
 * @param {number} year
 * @returns {number}
 */
export function getDaysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}

/**
 * Returns current Date in Indian Standard Time (IST = Asia/Kolkata).
 * If simulatedDate is passed (ISO string or Date), it uses that date.
 * @param {string|Date|null} simulatedDate
 * @returns {{ year: number, month: number, day: number, hour: number, minute: number, second: number, rawDate: Date }}
 */
export function getKolkataDate(simulatedDate = null) {
  const baseDate = simulatedDate ? new Date(simulatedDate) : new Date();

  // Format to Asia/Kolkata (IST) calendar parts
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  });

  const parts = formatter.formatToParts(baseDate);
  const values = {};
  for (const p of parts) {
    if (p.type !== 'literal') {
      values[p.type] = parseInt(p.value, 10);
    }
  }

  return {
    year: values.year,
    month: values.month, // 1-12
    day: values.day,     // 1-31
    hour: values.hour === 24 ? 0 : values.hour, // 0-23
    minute: values.minute,
    second: values.second,
    rawDate: baseDate
  };
}

export const getISTDate = getKolkataDate;

/**
 * Calculates current day-of-year (1 to 365/366) in IST.
 * @param {string|Date|null} simulatedDate
 * @returns {number}
 */
export function getDayOfYear(simulatedDate = null) {
  const kt = getKolkataDate(simulatedDate);
  const startOfYear = new Date(Date.UTC(kt.year, 0, 1, 0, 0, 0));
  const currentDayUtc = new Date(Date.UTC(kt.year, kt.month - 1, kt.day, 0, 0, 0));
  const diffMs = currentDayUtc.getTime() - startOfYear.getTime();
  const dayIndex = Math.floor(diffMs / (24 * 60 * 60 * 1000)) + 1;
  const maxDays = getDaysInYear(kt.year);
  return Math.max(1, Math.min(maxDays, dayIndex));
}

/**
 * Evaluates whether Birthday Mode is active in IST.
 * Birthday Mode runs strictly on November 30 (from Nov 30 00:00:00 IST to Nov 30 23:59:59 IST).
 * (Month 11, Day 30 in IST)
 * @param {string|Date|null} simulatedDate
 * @returns {boolean}
 */
export function isBirthdayActiveInKolkata(simulatedDate = null) {
  const kt = getKolkataDate(simulatedDate);
  return kt.month === 11 && kt.day === 30;
}

export const isBirthdayActiveInIST = isBirthdayActiveInKolkata;

/**
 * Calculates the exact state of the Garden of 365 Little Wishes.
 * Birthday Cycle Rules:
 *  1. Normal year = 365 flowers. Leap year = 366 flowers.
 *  2. November 29 is the final day before the birthday bloom (exactly Total - 1 bloomed).
 *  3. November 30 triggers the full birthday bloom (all 365 or 366 flowers bloom).
 *  4. On December 1 (and throughout December), the completed birthday garden remains visible
 *     without incorrectly resetting or restarting to 1 flower.
 *  5. Progresses dynamically across the year based on Gregorian date math.
 * 
 * @param {string|Date|null} simulatedDate
 * @returns {{
 *   bloomedCount: number,
 *   totalFlowers: number,
 *   isComplete: boolean,
 *   isBirthday: boolean,
 *   isLeap: boolean,
 *   year: number,
 *   dayNumber: number
 * }}
 */
export function getBirthdayGardenCycle(simulatedDate = null) {
  const kt = getKolkataDate(simulatedDate);
  const year = kt.year;
  const isLeap = isLeapYear(year);
  const totalFlowers = getDaysInYear(year);
  const isBirthday = isBirthdayActiveInKolkata(simulatedDate);
  const isAfterBirthdayInYear = kt.month === 12; // December 1-31

  // If today is November 30 (Birthday) OR after the birthday in December:
  // The completed garden is fully bloomed (365 or 366) and does not reset!
  if (isBirthday || isAfterBirthdayInYear) {
    return {
      bloomedCount: totalFlowers,
      totalFlowers,
      isComplete: true,
      isBirthday,
      isLeap,
      year,
      dayNumber: totalFlowers
    };
  }

  // Exactly November 29: Final day before the birthday bloom (Total - 1)
  if (kt.month === 11 && kt.day === 29) {
    return {
      bloomedCount: totalFlowers - 1,
      totalFlowers,
      isComplete: false,
      isBirthday: false,
      isLeap,
      year,
      dayNumber: totalFlowers - 1
    };
  }

  // Pre-November 29 progression throughout the year:
  // Calculate day-of-year for current date and for November 29
  const startOfYear = new Date(Date.UTC(year, 0, 1));
  const currentDayUtc = new Date(Date.UTC(year, kt.month - 1, kt.day));
  const nov29Utc = new Date(Date.UTC(year, 10, 29)); // 10 = November in Date.UTC

  const currentDay = Math.floor((currentDayUtc.getTime() - startOfYear.getTime()) / 86400000) + 1;
  const nov29Day = Math.floor((nov29Utc.getTime() - startOfYear.getTime()) / 86400000) + 1;

  // Scale smoothly from 1 on Jan 1 up to (totalFlowers - 1) on Nov 29
  const bloomed = Math.max(
    1,
    Math.min(
      totalFlowers - 1,
      Math.round(((currentDay - 1) / (nov29Day - 1)) * (totalFlowers - 2)) + 1
    )
  );

  return {
    bloomedCount: bloomed,
    totalFlowers,
    isComplete: false,
    isBirthday: false,
    isLeap,
    year,
    dayNumber: bloomed
  };
}

/**
 * Computes remaining time until upcoming November 30 00:00:00 IST.
 * - If today is November 30 IST, indicates Birthday Mode is active.
 * - If past November 30 (e.g. December 1 onward), targets next year's November 30.
 * - Prevents timer drift and calculates exact remaining days, hours, minutes, seconds.
 * @param {string|Date|null} simulatedDate
 */
export function getCountdownToBirthday(simulatedDate = null) {
  const kt = getKolkataDate(simulatedDate);
  const isBirthday = isBirthdayActiveInKolkata(simulatedDate);

  if (isBirthday) {
    return {
      isBirthday: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSecondsRemaining: 0,
      targetYear: kt.year,
      currentIST: `${kt.year}-${String(kt.month).padStart(2, '0')}-${String(kt.day).padStart(2, '0')} ${String(kt.hour).padStart(2, '0')}:${String(kt.minute).padStart(2, '0')}:${String(kt.second).padStart(2, '0')} IST`
    };
  }

  // Determine target year
  let targetYear = kt.year;
  // If we are in December (month 12), next birthday is November 30 of next year
  if (kt.month === 12) {
    targetYear = kt.year + 1;
  }

  // November 30 00:00:00 IST = November 29 18:30:00.000 UTC
  // (Month in Date.UTC is 0-indexed, so 10 = November)
  const targetUtcMillis = Date.UTC(targetYear, 10, 29, 18, 30, 0);
  const currentUtcMillis = kt.rawDate.getTime();

  let diff = targetUtcMillis - currentUtcMillis;

  if (diff < 0) {
    // If somehow past target, roll forward to next year
    targetYear += 1;
    const nextTargetUtc = Date.UTC(targetYear, 10, 29, 18, 30, 0);
    diff = nextTargetUtc - currentUtcMillis;
  }

  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    isBirthday: false,
    days,
    hours,
    minutes,
    seconds,
    totalSecondsRemaining: totalSeconds,
    targetYear,
    currentIST: `${kt.year}-${String(kt.month).padStart(2, '0')}-${String(kt.day).padStart(2, '0')} ${String(kt.hour).padStart(2, '0')}:${String(kt.minute).padStart(2, '0')}:${String(kt.second).padStart(2, '0')} IST`
  };
}
