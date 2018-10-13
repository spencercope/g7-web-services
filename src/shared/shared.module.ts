import { Global, HttpModule, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EmailService } from './email/email.service';
import { FcmService } from './fcm/fcm.service';

@Global()
@Module({
  imports: [AuthModule, HttpModule],
  providers: [EmailService, FcmService],
  exports: [AuthModule, EmailService, FcmService],
})
export class SharedModule {
}
