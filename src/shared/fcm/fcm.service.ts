import { HttpService, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from '@nestjs/common/http/interfaces/axios.interfaces';
import { NotificationOptions } from './fcm.model';

@Injectable()
export class FcmService {

  private readonly _fcmServerKey: string;
  private readonly _config: AxiosRequestConfig;
  private readonly _fcmSendUrl: string;

  constructor(private _http: HttpService) {
    this._fcmServerKey =
      'AAAAuiVZnpw:APA91bGv_FfA6bqbBu-OASjeCvsSe4FaOIRcaT0eB1AkIbKVil9SPkw_5c612RCJHpjT-' +
      'iWcDmzwneAPUJK1qZelobXCukjNymswXmnp5R2X9p21NYMAVHMqazzGUmhWgLHkhXAzqKb2';
    this._fcmSendUrl = 'https://fcm.googleapis.com/v1/projects/gh7-server/messages:send';
    this._config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this._fcmServerKey}`,
      },
    };
  }

  async sendNotificationToToken(fcmToken: string, notificationOptions: NotificationOptions): Promise<any> {
    const data = {
      message:{
        token: fcmToken,
        notification: notificationOptions,
      },
    };

    return this._http.post(this._fcmSendUrl, data, this._config).toPromise();
  }
}