/// <reference types="mongoose" />
import { SharedModel } from '../../shared/shared.model';
import { ModelType } from 'typegoose';
export declare class HelpRequest extends SharedModel<HelpRequest> {
    title: string;
    description: string;
    isRejected: boolean;
    isApproved: boolean;
    isComplete: boolean;
    senderId: string;
    receiverId: string;
    static readonly model: ModelType<HelpRequest>;
    static readonly modelName: string;
    static readonly schema: import("mongoose").Schema;
}
