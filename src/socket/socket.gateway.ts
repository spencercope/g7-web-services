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

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private _authService: AuthService) {
  }

  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  onEvent(client: any, payload: any): Observable<WsResponse<any>> {
    return of({ event: 'test', data: {} });
  }

  async handleConnection(client: Socket) {
    const { token } = client.handshake.query;

    if (!token) {
      client.disconnect(true);
      return;
    }

    try {
      await this._authService.verifyToken(token);
    } catch (e) {
      client.emit('exception', {
        status: false,
        message: 'Invalid token',
      });
      client.disconnect(true);
    }

    this.emitConnectedClients();
  }

  handleDisconnect(client: Client) {
    console.log('disconnect', client.id);
    this.emitConnectedClients();
  }

  private emitConnectedClients() {
    const length = Object.keys(this.server.sockets.sockets).length;
    this.server.emit('connected-count', { length });
  }
}
