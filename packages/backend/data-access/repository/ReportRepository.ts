import { FilterQuery } from 'mongoose';

import { generateDates, parseDate } from '@fatlook/core/utils';

import { ReportModel, ReportWithDoc } from '../models';

import { Repository } from './BaseRepository';

export class ReportRepository extends Repository<ReportWithDoc> {
    async findOne(conditions: FilterQuery<ReportWithDoc>): Promise<ReportWithDoc | null> {
        const { id, userId, date } = conditions;

        if (userId && date) {
            return await ReportModel.findOne({ userId, date });
        }

        return await super.findOne({ id });
    }

    async find(conditions: FilterQuery<ReportWithDoc>): Promise<ReportWithDoc[] | null> {
        const { id, userId, date } = conditions;

        if (userId && date) {
            const result: ReportWithDoc[] = [];

            const currentDate = parseDate(date);
            const dates = generateDates(currentDate);

            for (const day of dates) {
                const report = await ReportModel.findOne({ userId, date: day }).select('date weight steps');
                if (report) {
                    result.push(report);
                }
            }

            return result;
        }

        return super.find({ id });
    }

    async create(data: ReportWithDoc): Promise<ReportWithDoc> {
        const { userId, date } = data;
        return await ReportModel.findOneAndUpdate({ userId, date }, data, { upsert: true, new: true });
    }
}
