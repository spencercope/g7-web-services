import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
export declare class AuthService {
    private readonly _userService;
    private readonly _jwtService;
    constructor(_userService: UserService, _jwtService: JwtService);
    signIn(payload: any): Promise<string>;
    validateUser(payload: any): Promise<any>;
    decodeToken(token: any): Promise<any>;
    verifyToken(token: any): Promise<any>;
}
