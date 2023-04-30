import { differenceInDays, parse, format, isToday, isTomorrow, isYesterday } from 'date-fns';
import { ru } from 'date-fns/locale';

export const DEFAULT_DATE_FORMAT = 'yyMMd';

export const formatDate = (date: Date, formatString = DEFAULT_DATE_FORMAT) =>
    format(date, formatString, {
        locale: ru
    });

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
    const date = parse(dateString, formatString, new Date());
    const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS");
    const parsedDate = new Date(Date.parse(`${formattedDate}Z`));
    return parsedDate;
};

export const diffInDays = (a: Date, b: Date) => {
    return Math.abs(differenceInDays(a, b));
};
