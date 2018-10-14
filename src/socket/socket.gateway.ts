import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
  WsResponse,
} from '@nestjs/websockets';
import { Observable, of } from 'rxjs';
import { Client, Server, Socket } from 'socket.io';
import { AuthService } from '../shared/auth/auth.service';
import { UserService } from '../user/user.service';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly _authService: AuthService,
              private readonly _userService: UserService) {
  }

  @WebSocketServer() server: Server;
  private clientsLocations = {};
  private clients = {};

  @SubscribeMessage('message')
  onEvent(client: any, payload: any): Observable<WsResponse<any>> {
    return of({ event: 'test', data: {} });
  }

  async handleConnection(client: Socket) {
    const { token } = client.handshake.query;

    // if (!token) {
    //   client.disconnect(true);
    //   return;
    // }
    //
    // const decoded = await this.getDecodedToken(client, token);
    // const user = await this.getUser(client, decoded.email);
    //
    // if (this.clients[user.id]) {
    //   client.disconnect(true);
    // }

    this.clients[client.id] = client.id;
    this.emitConnectedClients();
  }

  /**
   *
   * @param client
   * @param data: {location: {lat, lng}, authToken: jwt_token}
   */
  @SubscribeMessage('send-location')
  async onLocationReceived(client: Socket, data: any) {
    const { lat, lng, authToken } = data;
    // let decoded;
    // try {
    //   decoded = await this._authService.verifyToken(authToken);
    // } catch (e) {
    //   this.emitExceptionEvent(client, 'Invalid token');
    // }
    //
    // let user;
    // try {
    //   user = await this._userService.findOne({ email: decoded.email });
    // } catch (e) {
    //   this.emitExceptionEvent(client, 'Invalid');
    // }

    this.clientsLocations[client.id] = this.clientsLocations[client.id] || { lat, lng};

    console.log('clientLocation', this.clientsLocations);
  }

  handleDisconnect(client: Client) {
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

  private emitExceptionEvent(client: Socket, message: string) {
    client.emit('exception', {
      status: false,
      message,
    });
    client.disconnect(true);
  }

  private emitConnectedClients() {
    const length = Object.keys(this.server.sockets.sockets).length;
    this.server.emit('connected-count', { length });
  }

  private async getDecodedToken(client: Socket, token: string) {
    let decoded;
    try {
      decoded = await this._authService.verifyToken(token);
    } catch (e) {
      this.emitExceptionEvent(client, 'Invalid token');
    }

    return decoded;
  }

  private async getUser(client: Socket, email: string) {
    let user;
    try {
      user = await this._userService.findOne({ email });
    } catch (e) {
      this.emitExceptionEvent(client, 'Invalid');
    }

    return user;
  }
}
