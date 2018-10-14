import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HelpRequest } from './models/request.model';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HelpRequest.modelName, schema: HelpRequest.schema }]),
    SocketModule,
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {
}
