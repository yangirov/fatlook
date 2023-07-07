import mongoose, { Schema, Document, Model } from 'mongoose';

import { FoodDetails, FoodInfo, Meal, ReportData } from '@fatlook/core/types';

export interface ReportWithDoc extends ReportData, Document {
    userId: string;
}

const foodDetailsSchema = new Schema<FoodDetails>(
    {
        kcal: { type: Schema.Types.Mixed },
        allFat: { type: Schema.Types.Mixed },
        fat: { type: Schema.Types.Mixed },
        saturatedFat: { type: Schema.Types.Mixed },
        carbohydrates: { type: Schema.Types.Mixed },
        fiber: { type: Schema.Types.Mixed },
        sugar: { type: Schema.Types.Mixed },
        protein: { type: Schema.Types.Mixed },
        sodium: { type: Schema.Types.Mixed },
        cholesterol: { type: Schema.Types.Mixed },
        kalium: { type: Schema.Types.Mixed },
    },
    { _id: false }
);

const foodInfoSchema = new Schema<FoodInfo>({
    name: { type: String, required: true },
    weight: { type: String, required: true },
    details: foodDetailsSchema,
});

const mealSchema = new Schema<Meal>({
    name: { type: String, required: true },
    total: foodDetailsSchema,
    foods: [{ type: foodInfoSchema }],
});

const reportSchema = new Schema<ReportWithDoc>({
    userId: { type: String, required: true },
    date: { type: String, required: true },
    total: { type: Schema.Types.Mixed, required: true },
    data: { type: [{ date: String, meals: [mealSchema] }], required: true },
    weight: { type: Number },
    steps: { type: Number },
    hash: { type: String },
});

reportSchema.index({ userId: 1, date: 1 });

export const ReportModel: Model<ReportWithDoc> = mongoose.model<ReportWithDoc>('Report', reportSchema);
