"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const google = require("googleapis");
const key = require("./gh7-server.json");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let FcmService = class FcmService {
    constructor(_http) {
        this._http = _http;
        this._fcmSendUrl = 'https://fcm.googleapis.com/v1/projects/gh7-server/messages:send';
        this._config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer {token}`,
            },
        };
    }
    getFcmAccessToken() {
        return new rxjs_1.Observable(observer => {
            const jwtClient = new google.google.auth.JWT(key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/firebase.messaging'], null);
            jwtClient.authorize()
                .then(tokens => observer.next(tokens.access_token))
                .catch(e => observer.error(e));
        });
    }
    sendNotificationToToken(fcmToken, notificationOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getFcmAccessToken()
                .pipe(operators_1.startWith(this._fcmAccessToken || null), operators_1.filter(data => !!data), operators_1.tap(token => this._fcmAccessToken = token), operators_1.switchMap(_ => {
                console.log({ token: this._fcmAccessToken });
                this._config.headers.Authorization = this._config.headers.Authorization.replace('{token}', this._fcmAccessToken);
                const data = {
                    message: {
                        token: fcmToken,
                        notification: notificationOptions,
                    },
                };
                return this._http.post(this._fcmSendUrl, data, this._config);
            })).toPromise();
        });
    }
};
FcmService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], FcmService);
exports.FcmService = FcmService;
//# sourceMappingURL=fcm.service.js.map