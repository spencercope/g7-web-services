import { HelpRequest } from './models/request.model';
import { ModelType } from 'typegoose';
import { SharedService } from '../shared/shared.service';
import { UserService } from '../user/user.service';
import { FcmService } from '../shared/fcm/fcm.service';
export declare class RequestService extends SharedService<HelpRequest> {
    private readonly _helpRequestModel;
    private readonly _userService;
    private readonly _fcmService;
    constructor(_helpRequestModel: ModelType<HelpRequest>, _userService: UserService, _fcmService: FcmService);
    getAll(): Promise<import("typegoose").InstanceType<HelpRequest>[]>;
    getRequestByReciver(receiverId: any): Promise<import("typegoose").InstanceType<HelpRequest>[]>;
    createRequest(vm: HelpRequest): Promise<any>;
    updateRequest(requestId: string, vm: HelpRequest): Promise<import("typegoose").InstanceType<HelpRequest>>;
}
