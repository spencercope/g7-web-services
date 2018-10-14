/// <reference types="mongoose" />
import { ModelType, Ref } from 'typegoose';
import { SharedModel } from '../../shared/shared.model';
import { HelpRequest } from '../../request/models/request.model';
export declare class User extends SharedModel<User> {
    password: string;
    email: string;
    rating: number;
    ratingCount: number;
    isHelper: boolean;
    isVerified: boolean;
    requests: Ref<HelpRequest>[];
    organization?: string;
    nickname?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    fcmToken?: string;
    static readonly model: ModelType<User>;
    static readonly modelName: string;
    static readonly schema: import("mongoose").Schema;
}
