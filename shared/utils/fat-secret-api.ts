import { format, differenceInDays } from 'date-fns';

export const getFoodDiaryLink = (userId: string, date: Date): string => {
    const daysDiff = differenceInDays(date, new Date(+0)) + 1;
    const dateString = format(date, 'yyMd');

    return `${process.env.FATSECRET_URL}/export/${userId}/salt/${daysDiff}/day/food/FoodDiary_${dateString}_foods.csv?lang=ru&mkt=RU`;
};
