export type FoodUnit = string | number | null;

export type FoodInfo = {
    name: string;
    weight: string;
    details: FoodDetails;
};

export type FoodDetails = {
    kcal: FoodUnit;
    fat: FoodUnit;
    nonSaturatedFat: FoodUnit;
    carbohydrates: FoodUnit;
    fiber: FoodUnit;
    sugar: FoodUnit;
    protein: FoodUnit;
    sodium: FoodUnit;
    cholesterol: FoodUnit;
    kalium: FoodUnit;
};

export const unitMap: { [key: string]: string[] } = {
    kcal: ['Кал ( ккал)', 'г'],
    fat: ['Жир( г)', 'г'],
    nonSaturatedFat: ['Н/жир( г)', 'г'],
    carbohydrates: ['Углев( г)', 'г'],
    fiber: ['Клетч( г)', 'г'],
    sugar: ['Сахар( г)', 'г'],
    protein: ['Белк( г)', 'г'],
    sodium: ['Натри( мг)', 'мг'],
    cholesterol: ['Холес( мг)', 'мг'],
    kalium: ['Калий( мг)', 'г']
};

export const mealIconMap: { [key: string]: string } = {
    Завтрак: '🌅',
    Обед: '🕑',
    Ужин: '🌇',
    Перекус: '🍏'
};
