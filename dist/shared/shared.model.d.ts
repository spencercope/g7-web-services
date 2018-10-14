import { Typegoose } from 'typegoose';
export declare class SharedModel<T> extends Typegoose {
    createdAt: Date;
    updatedAt: Date;
    id?: string;
}
