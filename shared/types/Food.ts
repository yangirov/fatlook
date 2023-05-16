export type FoodUnit = string | number | null;

export type FoodDetails = {
    kcal: FoodUnit;
    allFat: FoodUnit;
    fat: FoodUnit;
    nonSaturatedFat: FoodUnit;
    carbohydrates: FoodUnit;
    fiber: FoodUnit;
    sugar: FoodUnit;
    protein: FoodUnit;
    sodium: FoodUnit;
    cholesterol: FoodUnit;
    kalium: FoodUnit;
    [key: string]: FoodUnit;
};

export type FoodInfo = {
    name: string;
    weight: string;
    details: FoodDetails;
};

export type PartialFoodDetailsKeys = Partial<keyof FoodDetails>[];
