import { Document, Model, FilterQuery, UpdateQuery } from 'mongoose';

export class Repository<T extends Document> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async findOne(conditions: FilterQuery<T>): Promise<T | null> {
        return await this.model.findOne(conditions);
    }

    async find(conditions: FilterQuery<T>): Promise<T[] | null> {
        return await this.model.find(conditions);
    }

    async create(data: T): Promise<T> {
        return this.model.create(data);
    }

    async update(conditions: FilterQuery<T>, update: UpdateQuery<T>): Promise<T | null> {
        return await this.model.findOneAndUpdate(conditions, update, { new: true });
    }

    async delete(conditions: FilterQuery<T>): Promise<T | null> {
        return await this.model.findOneAndDelete(conditions);
    }
}
