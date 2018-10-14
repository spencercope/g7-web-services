import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './socket/socket.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { RequestModule } from './request/request.module';


@Module({
  imports: [
    SocketModule,
    UserModule,
    SharedModule,
    MongooseModule.forRoot('mongodb+srv://admin:admin123@cluster0-kgbt4.mongodb.net/test?retryWrites=true', {
      retryAttempts: 3,
      retryDelay: 3000,
      useNewUrlParser: true,
      useFindAndModify: false
    }),
    RequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
