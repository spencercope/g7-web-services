import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../user/user.service';

@Injectable()
export class AuthService {
  constructor(@Inject(forwardRef(() => UserService))
              private readonly _userService: UserService,
              private readonly _jwtService: JwtService) {
  }

  async signIn(payload) {
    return this._jwtService.sign(payload);
  }

  async validateUser(payload): Promise<any> {
    return this._userService.findOne({ username: payload.username });
  }

  async decodeToken(token): Promise<any> {
    return this._jwtService.decode(token, { json: true });
  }
}
