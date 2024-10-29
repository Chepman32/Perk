import {DateTime} from 'luxon';

export const dateFormatFromISO = (date: any, format?: string) => {
  if (date) {
    const result = DateTime.fromISO(
      typeof date === 'string' ? date : date.toISOString(),
    ).toFormat(format ? format : 'dd.MM.y');

    if (result == 'Invalid DateTime') {
      return date;
    }
    return result;
  }
  return '';
};

export const dateMouthYearLetters = (date: any, obj?: any) => {
  if (date) {
    return DateTime.fromISO(date).toLocaleString(
      obj
        ? obj
        : {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          },
    );
  }
  return '';
};

export const dateFormatPeriodDate = (date: any, format?: string) => {
  if (date) {
    const result = DateTime.fromJSDate(date).toFormat(
      format ? format : 'dd.MM.y',
    );

    if (result == 'Invalid DateTime') {
      return date;
    }
    return result;
  }
  return '';
};

export const periodDate = (days?: number) => {
  if (days) {
    return DateTime.now().minus({days: days}).toJSDate();
  }
  return DateTime.now().toJSDate();
};

export const getCurrectDate = () => {
  return DateTime.now();
};
