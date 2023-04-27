export const getFoodDiaryLink = (userId: string, date: Date): string => {
    const randomValue = Math.random().toString(36).substring(2, 7).toUpperCase();
    const dateIncrement = Math.floor(date.getTime() / 1000 / 60 / 60 / 24) + 1;
    const dateString = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`;

    return `https://www.fatsecret.com/export/${userId}/${randomValue}/${dateIncrement}/day/food/FoodDiary_${dateString}_foods.csv?lang=ru&mkt=RU`;
};
