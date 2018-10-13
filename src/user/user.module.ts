import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './models/user.model';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.modelName, schema: User.schema }])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
}
