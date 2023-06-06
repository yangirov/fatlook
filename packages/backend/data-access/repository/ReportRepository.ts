import { FilterQuery } from 'mongoose';

import { ReportModel, ReportWithDoc } from '../models';

import { Repository } from './BaseRepository';

export class ReportRepository extends Repository<ReportWithDoc> {
    async findOne(conditions: FilterQuery<ReportWithDoc>): Promise<ReportWithDoc | null> {
        const { id, userId, date } = conditions;

        if (userId && date) {
            return ReportModel.findOne({ userId, date }).exec();
        }

        return super.findOne({ id });
    }

    async create(data: ReportWithDoc): Promise<ReportWithDoc> {
        const { userId, date } = data;
        return ReportModel.findOneAndUpdate({ userId, date }, data, { upsert: true, new: true }).exec();
    }
}
