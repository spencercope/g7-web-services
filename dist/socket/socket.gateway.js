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
const websockets_1 = require("@nestjs/websockets");
const rxjs_1 = require("rxjs");
const auth_service_1 = require("../shared/auth/auth.service");
const user_service_1 = require("../user/user.service");
let SocketGateway = class SocketGateway {
    constructor(_authService, _userService) {
        this._authService = _authService;
        this._userService = _userService;
        this.clientsLocations = {};
        this.clients = {};
    }
    onEvent(client, payload) {
        return rxjs_1.of({ event: 'test', data: {} });
    }
    handleConnection(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = client.handshake.query;
            this.clients[client.id] = client.id;
            this.emitConnectedClients();
        });
    }
    onLocationReceived(client, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lat, lng, authToken } = data;
            this.clientsLocations[client.id] = this.clientsLocations[client.id] || { lat, lng };
            console.log('clientLocation', this.clientsLocations);
        });
    }
    handleDisconnect(client) {
        console.log('disconnect', client.id);
        for (const key in this.clients) {
            if (this.clients[key] === client.id) {
                delete this.clients[key];
                delete this.clientsLocations[key];
                break;
            }
        }
        this.emitConnectedClients();
    }
    emitExceptionEvent(client, message) {
        client.emit('exception', {
            status: false,
            message,
        });
        client.disconnect(true);
    }
    emitConnectedClients() {
        const length = Object.keys(this.server.sockets.sockets).length;
        this.server.emit('connected-count', { length });
    }
    getDecodedToken(client, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let decoded;
            try {
                decoded = yield this._authService.verifyToken(token);
            }
            catch (e) {
                this.emitExceptionEvent(client, 'Invalid token');
            }
            return decoded;
        });
    }
    getUser(client, email) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                user = yield this._userService.findOne({ email });
            }
            catch (e) {
                this.emitExceptionEvent(client, 'Invalid');
            }
            return user;
        });
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], SocketGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], SocketGateway.prototype, "onEvent", null);
__decorate([
    websockets_1.SubscribeMessage('send-location'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "onLocationReceived", null);
SocketGateway = __decorate([
    websockets_1.WebSocketGateway(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], SocketGateway);
exports.SocketGateway = SocketGateway;
//# sourceMappingURL=socket.gateway.js.map