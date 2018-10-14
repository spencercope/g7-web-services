import { UserService } from './user.service';
import { User } from './models/user.model';
import { RegisterModel } from './models/register.model';
import { LoginModel } from './models/login.model';
import { ProfileModel } from './models/profile.model';
export declare class UserController {
    private readonly _userService;
    constructor(_userService: UserService);
    get(): Promise<User[]>;
    register(vm: RegisterModel): Promise<boolean>;
    verify(token: string): Promise<boolean>;
    getByEmail(email: string): Promise<User>;
    login(vm: LoginModel): Promise<any>;
    updateFcmToken(req: any, token: string): Promise<boolean>;
    updateProfile(req: any, vm: ProfileModel): Promise<User>;
}
