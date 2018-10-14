import { ModelType, Typegoose, InstanceType } from 'typegoose';
export declare abstract class SharedService<T extends Typegoose> {
    protected _model: ModelType<T>;
    private toObjectId;
    findAll(filter?: {}, projections?: {}, options?: {}): Promise<InstanceType<T>[]>;
    findOne(filter?: {}, projections?: {}, options?: {}): Promise<InstanceType<T>>;
    findById(id: string): Promise<InstanceType<T>>;
    create(item: InstanceType<T>): Promise<InstanceType<T>>;
    delete(id: string): Promise<InstanceType<T>>;
    update(id: string, item: InstanceType<T>): Promise<InstanceType<T>>;
    clearCollection(filter?: {}): Promise<void>;
}
