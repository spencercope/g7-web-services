import { Body, Controller, Get, InternalServerErrorException, Post, Put, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { User } from './models/user.model';
import { RegisterModel } from './models/register.model';
import { LoginModel } from './models/login.model';
import { ProfileModel } from './models/profile.model';

@Controller('users')
export class UserController {

  constructor(private readonly _userService: UserService) {
  }

  @Get()
  async get(): Promise<User[]> {
    return this._userService.getUsers();
  }

  @Post('register')
  async register(@Body() vm: RegisterModel): Promise<boolean> {
    return this._userService.register(vm);
  }

  @Get('verify')
  async verify(@Query('token') token: string): Promise<boolean> {
    return this._userService.verifyEmail(token);
  }

  @Get('by-email')
  async getByEmail(@Query('email') email: string): Promise<User> {
    try {
      const result = await this._userService.findOne({ email });
      return result.toJSON();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Post('login')
  async login(@Body() vm: LoginModel): Promise<any> {
    return this._userService.login(vm);
  }

  @Put('update-fcm')
  @UseGuards(AuthGuard())
  async updateFcmToken(@Req() req, @Body('token') token: string): Promise<boolean> {
    const currentUser = req.user;

    if (!currentUser.isVerified) {
      throw new UnauthorizedException('Not verified');
    }

    return this._userService.updateFcmToken(currentUser.id, token);
  }

  @Put('update-profile')
  @UseGuards(AuthGuard())
  async updateProfile(@Req() req, @Body() vm: ProfileModel): Promise<User> {
    const currentUser = req.user;

    if (!currentUser.isVerified) {
      throw new UnauthorizedException('Not verified');
    }

    const result = await this._userService.updateProfile(currentUser.id, vm);
    return result.toJSON();
  } 
}
