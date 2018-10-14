import { OnGatewayConnection, OnGatewayDisconnect, WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Client, Server, Socket } from 'socket.io';
import { AuthService } from '../shared/auth/auth.service';
import { UserService } from '../user/user.service';
export declare class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly _authService;
    private readonly _userService;
    constructor(_authService: AuthService, _userService: UserService);
    server: Server;
    private clientsLocations;
    private clients;
    onEvent(client: any, payload: any): Observable<WsResponse<any>>;
    handleConnection(client: Socket): Promise<void>;
    onLocationReceived(client: Socket, data: any): Promise<void>;
    handleDisconnect(client: Client): void;
    private emitExceptionEvent;
    private emitConnectedClients;
    private getDecodedToken;
    private getUser;
}
