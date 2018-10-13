import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HelpRequest } from './models/request.model';

@Module({
  imports: [MongooseModule.forFeature([{name: HelpRequest.modelName, schema: HelpRequest.schema}])],
  controllers: [RequestController],
  providers: [RequestService]
})
export class RequestModule {}
