import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SharedService } from '../shared/shared.service';
import { User } from './models/user.model';
import { AuthService } from '../shared/auth/auth.service';
import { InstanceType, ModelType } from 'typegoose';
import { RegisterModel } from './models/register.model';
import { LoginModel } from './models/login.model';
import { compare, genSalt, hash } from 'bcryptjs';
import { EmailData, EmailService } from '../shared/email/email.service';
import { ProfileModel } from './models/profile.model';

@Injectable()
export class UserService extends SharedService<User> {

  constructor(@Inject(forwardRef(() => AuthService)) private readonly _authService: AuthService,
              @InjectModel(User.modelName) private readonly _userModel: ModelType<User>,
              private readonly _emailService: EmailService) {
    super();
    this._model = _userModel;
  }

  async register(vm: RegisterModel): Promise<boolean> {
    const { email, isHelper, password } = vm;
    let user;

    try {
      user = await this.findOne({ email });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    if (user) {
      throw new BadRequestException('Already existed');
    }

    const newUser = new this._model();
    newUser.email = email;
    newUser.isHelper = isHelper;
    const salt = await genSalt(10);
    newUser.password = await hash(password, salt);
    
    await this.create(newUser);
    await this.sendVerificationEmail(newUser);

    return true;
  }

  private async sendVerificationEmail(user: InstanceType<User>) {
    const payload = { email: user.email };
    const token = await this._authService.signIn(payload);

    const emailContent: EmailData = {
      email: user.email,
      verifyUrl: `http://localhost:8100/verify&token=${token}`,
    };

    return await this._emailService.sendEmail('verify-email', user.email, null, emailContent);
  }

  async verifyEmail(token: string): Promise<boolean> {
    const decoded = await this._authService.decodeToken(token);
    let user: InstanceType<User>;
    try {
      user = await this.findOne({ email: decoded.email });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    if (!user) {
      throw new NotFoundException('Not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('Already verified');
    }

    user.isVerified = true;
    await this.update(user.id, user);

    return true;
  }

  async login(vm: LoginModel): Promise<any> {
    const { email, password } = vm;

    let user: InstanceType<User>;
    try {
      user = await this.findOne({ email });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    if (!user) {
      throw new NotFoundException('Invalid Credentials');
    }

    const isMatched = await compare(password, user.password);

    if (!isMatched) {
      throw new BadRequestException('Invalid Credentials');
    }

    const result = { ...user.toJSON() };
    delete result.password;

    const payload = { email: result.email };

    const token = await this._authService.signIn(payload);

    return {
      token,
      info: { ...result },
    };
  }

  async updateFcmToken(userId: string, token: string): Promise<boolean> {
    let user;
    try {
      user = await this.findById(userId);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    user.fcmToken = token;
    await this.update(userId, user);
    return true;
  }

  async updateProfile(userId: string, vm: ProfileModel): Promise<InstanceType<User>> {
    let user;

    try {
      user = await this.findById(userId);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    const {  firstName, lastName, nickname, organization, phone } = vm;
    user.firstName = firstName;
    user.lastName = lastName;
    user.nickname = nickname;
    user.organization = organization;
    user.phone = phone;


    try {
      return this.update(userId, user);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
