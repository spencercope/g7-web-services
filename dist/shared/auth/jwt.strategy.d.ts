import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
declare const JwtStrategy_base: new (...args: any[]) => typeof Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly _authService;
    constructor(_authService: AuthService);
    validate(payload: any): Promise<any>;
}
export {};
