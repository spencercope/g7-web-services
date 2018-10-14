import { SharedService } from '../shared/shared.service';
import { User } from './models/user.model';
import { AuthService } from '../shared/auth/auth.service';
import { InstanceType, ModelType } from 'typegoose';
import { RegisterModel } from './models/register.model';
import { LoginModel } from './models/login.model';
import { EmailService } from '../shared/email/email.service';
import { ProfileModel } from './models/profile.model';
export declare class UserService extends SharedService<User> {
    private readonly _authService;
    private readonly _userModel;
    private readonly _emailService;
    constructor(_authService: AuthService, _userModel: ModelType<User>, _emailService: EmailService);
    getUsers(): Promise<InstanceType<User>[]>;
    register(vm: RegisterModel): Promise<boolean>;
    private sendVerificationEmail;
    verifyEmail(token: string): Promise<boolean>;
    login(vm: LoginModel): Promise<any>;
    updateFcmToken(userId: string, token: string): Promise<boolean>;
    updateProfile(userId: string, vm: ProfileModel): Promise<InstanceType<User>>;
}
