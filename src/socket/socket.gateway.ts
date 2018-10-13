import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Observable, of } from 'rxjs';
import { Client, Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  onEvent(client: any, payload: any): Observable<WsResponse<any>> {
    return of({ event: 'test', data: {} });
  }

  handleConnection(client: Socket) {
    console.log(client.handshake.query);
    const length = Object.keys(this.server.sockets.sockets).length;
    this.server.emit('connected-count', { length });
  }

  handleDisconnect(client: Client) {
    console.log('disconnect', client.id);
    const length = Object.keys(this.server.sockets.sockets).length;
    this.server.emit('connected-count', { length });
  }
}
