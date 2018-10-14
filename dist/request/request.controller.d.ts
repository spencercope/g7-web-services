import { HelpRequest } from './models/request.model';
import { RequestService } from './request.service';
export declare class RequestController {
    private readonly _requestService;
    constructor(_requestService: RequestService);
    create(vm: HelpRequest): Promise<boolean>;
    updateRequest(req: any, vm: HelpRequest): Promise<any>;
    getRequestByReciver(req: any): Promise<import("typegoose").InstanceType<HelpRequest>[]>;
    get(): Promise<import("typegoose").InstanceType<HelpRequest>[]>;
}
