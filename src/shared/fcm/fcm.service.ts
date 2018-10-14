import { HttpService, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from '@nestjs/common/http/interfaces/axios.interfaces';
import * as google from 'googleapis';
import { NotificationOptions } from './fcm.model';
import * as key from './gh7-server.json';
import { Observable } from 'rxjs';
import { filter, startWith, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class FcmService {
  private readonly _config: AxiosRequestConfig;
  private readonly _fcmSendUrl: string;
  private _fcmAccessToken: string;

  constructor(private _http: HttpService) {
    this._fcmSendUrl = 'https://fcm.googleapis.com/v1/projects/gh7-server/messages:send';
    this._config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer {token}`,
      },
    };
  }

  private getFcmAccessToken() {
    return new Observable<string>(observer => {
      const jwtClient = new google.google.auth.JWT(
        key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/firebase.messaging'], null,
      );

      jwtClient.authorize()
        .then(tokens => observer.next(tokens.access_token))
        .catch(e => observer.error(e));
    });
  }

  async sendNotificationToToken(fcmToken: string, notificationOptions: NotificationOptions): Promise<any> {
    return this.getFcmAccessToken()
      .pipe(
        startWith(this._fcmAccessToken || null),
        filter(data => !!data),
        tap(token => this._fcmAccessToken = token),
        switchMap(_ => {
          console.log({ token: this._fcmAccessToken });

          this._config.headers.Authorization = this._config.headers.Authorization.replace('{token}', this._fcmAccessToken);
          const data = {
            message: {
              token: fcmToken,
              notification: notificationOptions,
            },
          };

          return this._http.post(this._fcmSendUrl, data, this._config);
        }),
      ).toPromise();
  }
}
