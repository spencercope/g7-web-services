import { HttpService, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from '@nestjs/common/http/interfaces/axios.interfaces';
import { NotificationOptions } from './fcm.model';

@Injectable()
export class FcmService {
  private readonly _config: AxiosRequestConfig;
  private readonly _fcmSendUrl: string;

  constructor(private _http: HttpService) {
    this._fcmSendUrl = 'https://fcm.googleapis.com/fcm/send';
    this._config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'key=AAAAuiVZnpw:APA91bGv_FfA6bqbBu-OASjeCvsSe4FaOIRcaT0eB1AkIbKVil9SPkw_5c612RCJHpjT-' +
          'iWcDmzwneAPUJK1qZelobXCukjNymswXmnp5R2X9p21NYMAVHMqazzGUmhWgLHkhXAzqKb2',
      },
    };
  }

  // private getFcmAccessToken() {
  //   return new Observable<string>(observer => {
  //     const jwtClient = new google.google.auth.JWT(
  //       key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/firebase.messaging'], null,
  //     );
  //
  //     jwtClient.authorize()
  //       .then(tokens => observer.next(tokens.access_token))
  //       .catch(e => observer.error(e));
  //   });
  // }

  async sendNotificationToToken(fcmToken: string, notificationOptions: NotificationOptions): Promise<any> {

    const data = {
      to: fcmToken,
      notification: notificationOptions,
      data: notificationOptions,
    };

    return new Promise<any>((resolve, reject) => {
      this._http.post(' https://fcm.googleapis.com/fcm/send', data, this._config).subscribe(data => {
        console.log(data);
      });
    });

    // return this.getFcmAccessToken()
    //   .pipe(
    //     startWith(this._fcmAccessToken || null),
    //     filter(data => !!data),
    //     tap(token => this._fcmAccessToken = token),
    //     switchMap(_ => {
    //       this._config.headers.Authorization = this._config.headers.Authorization.replace('{token}', this._fcmAccessToken);
    //       const data = {
    //         message: {
    //           token: fcmToken,
    //           notification: notificationOptions,
    //         },
    //       };
    //
    //       return this._http.post(this._fcmSendUrl, data, this._config);
    //     }),
    //   ).toPromise();
  }
}
