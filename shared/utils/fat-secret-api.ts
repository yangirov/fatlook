import { parseDate, diffInDays } from './dates';

export const getFoodDiaryLink = (userId: string, dateString: string): string => {
    const date = parseDate(dateString);
    const daysDiff = diffInDays(date, new Date(+0));
    const salt = (Math.random() + 1).toString(36).substring(7).toUpperCase();

    return `${process.env.FATSECRET_URL}/export/${userId}/${salt}/${daysDiff}/day/food/FoodDiary_${dateString}_foods.csv?lang=ru&mkt=RU`;
};
