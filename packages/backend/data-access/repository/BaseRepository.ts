import { Document, Model, FilterQuery, UpdateQuery } from 'mongoose';

export class Repository<T extends Document> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async findOne(conditions: FilterQuery<T>): Promise<T | null> {
        return this.model.findOne(conditions).exec();
    }

    async create(data: T): Promise<T> {
        return this.model.create(data);
    }

    async update(conditions: FilterQuery<T>, update: UpdateQuery<T>): Promise<T | null> {
        return this.model.findOneAndUpdate(conditions, update, { new: true }).exec();
    }

    async delete(conditions: FilterQuery<T>): Promise<T | null> {
        return this.model.findOneAndDelete(conditions).exec();
    }
}
