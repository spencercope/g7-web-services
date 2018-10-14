import { HttpService } from '@nestjs/common';
import { NotificationOptions } from './fcm.model';
export declare class FcmService {
    private _http;
    private readonly _config;
    private readonly _fcmSendUrl;
    private _fcmAccessToken;
    constructor(_http: HttpService);
    private getFcmAccessToken;
    sendNotificationToToken(fcmToken: string, notificationOptions: NotificationOptions): Promise<any>;
}
