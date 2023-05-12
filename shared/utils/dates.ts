import { differenceInDays, parse, format, isToday, isTomorrow, isYesterday } from 'date-fns';
import { ru } from 'date-fns/locale';

export const DEFAULT_DATE_FORMAT = 'yyMMd';

type DateFormatOptions = {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    firstWeekContainsDate?: number;
    useAdditionalWeekYearTokens?: boolean;
    useAdditionalDayOfYearTokens?: boolean;
};

export const formatDate = (
    date: Date,
    formatString = DEFAULT_DATE_FORMAT,
    options: DateFormatOptions = {
        locale: ru
    }
) => format(date, formatString, options);

export const beautifyDate = (d: Date | null) => {
    if (!d) return 'Нет даты';

    if (isYesterday(d)) {
        return 'Вчера';
    }

    if (isToday(d)) {
        return 'Сегодня';
    }

    if (isTomorrow(d)) {
        return 'Завтра';
    }

    return formatDate(d, 'EEEE, LLLL d');
};

export const parseDate = (dateString: string, formatString = DEFAULT_DATE_FORMAT) => {
    const date = parse(dateString, formatString, new Date(), {
        locale: ru
    });

    const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS");
    const parsedDate = new Date(Date.parse(`${formattedDate}Z`));
    return parsedDate;
};

export const diffInDays = (a: Date, b: Date) => {
    return Math.abs(differenceInDays(a, b));
};
