import { connect, FilterQuery, Mongoose, Model, Document } from 'mongoose';

import { Repository } from '../data-access/repository';

export class BaseService<T extends Document> {
    private instance?: Mongoose;
    private repository?: Repository<T>;

    constructor(model: Model<T>, customRepository?: Repository<T>) {
        this.repository = customRepository ?? new Repository<T>(model);
    }

    async connect(connectionString: string): Promise<void> {
        try {
            this.instance = await connect(connectionString);
        } catch (e) {
            console.log(e);
        }
    }

    async disconnect(): Promise<void> {
        if (this.instance) {
            await this.instance.disconnect();
        }
    }

    private ensureConnectionAndRepositoryInitialized(): void {
        if (!this.instance) {
            throw new Error('Service has not been connected to the database.');
        }

        if (!this.repository) {
            throw new Error('Repository not initialized.');
        }
    }

    async get(conditions: FilterQuery<T>): Promise<T | null> {
        this.ensureConnectionAndRepositoryInitialized();

        const result = await this.repository?.findOne(conditions);
        return result ?? null;
    }

    async getAll(conditions: FilterQuery<T>): Promise<T[] | null> {
        this.ensureConnectionAndRepositoryInitialized();

        const result = await this.repository?.find(conditions);
        return result ?? null;
    }

    async create(payload: T): Promise<T | null> {
        const result = await this.repository?.create(payload);
        return result ?? null;
    }

    async update(id: string, payload: Partial<T>): Promise<T | null> {
        const result = await this.repository?.update({ id }, payload);
        return result ?? null;
    }

    async delete(id: string): Promise<T | null> {
        const result = await this.repository?.delete({ id });
        return result ?? null;
    }
}
