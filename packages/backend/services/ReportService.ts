import { Model } from 'mongoose';

import { ReportWithDoc } from '../data-access/models';
import { ReportRepository } from '../data-access/repository';

import { BaseService } from './BaseService';

export class ReportService extends BaseService<ReportWithDoc> {
    constructor(model: Model<ReportWithDoc>) {
        super(model, new ReportRepository(model));
    }
}
