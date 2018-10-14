"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const shared_service_1 = require("../shared/shared.service");
const user_model_1 = require("./models/user.model");
const auth_service_1 = require("../shared/auth/auth.service");
const bcryptjs_1 = require("bcryptjs");
const email_service_1 = require("../shared/email/email.service");
let UserService = class UserService extends shared_service_1.SharedService {
    constructor(_authService, _userModel, _emailService) {
        super();
        this._authService = _authService;
        this._userModel = _userModel;
        this._emailService = _emailService;
        this._model = _userModel;
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.find().populate('requests').exec();
        });
    }
    register(vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, isHelper, password } = vm;
            let user;
            let salt;
            try {
                user = yield this.findOne({ email });
            }
            catch (e) {
                throw new common_1.InternalServerErrorException(e);
            }
            if (user) {
                if (user.isVerified) {
                    throw new common_1.BadRequestException('Already existed');
                }
                else {
                    salt = yield bcryptjs_1.genSalt(10);
                    user.password = yield bcryptjs_1.hash(password, salt);
                    yield this.update(user.id, user);
                    yield this.sendVerificationEmail(user);
                    return true;
                }
            }
            const newUser = new this._model();
            newUser.email = email;
            newUser.isHelper = isHelper;
            salt = yield bcryptjs_1.genSalt(10);
            newUser.password = yield bcryptjs_1.hash(password, salt);
            yield this.create(newUser);
            yield this.sendVerificationEmail(newUser);
            return true;
        });
    }
    sendVerificationEmail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { email: user.email };
            const token = yield this._authService.signIn(payload);
            const emailContent = {
                email: user.email,
                verifyUrl: `http://localhost:8100/verify&token=${token}`,
            };
            return yield this._emailService.sendEmail('verify-email', user.email, null, emailContent);
        });
    }
    verifyEmail(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = yield this._authService.decodeToken(token);
            if (!decoded) {
                throw new common_1.BadRequestException('Invalid token');
            }
            let user;
            try {
                user = yield this.findOne({ email: decoded.email });
            }
            catch (e) {
                throw new common_1.InternalServerErrorException(e);
            }
            if (!user) {
                throw new common_1.NotFoundException('Not found');
            }
            if (user.isVerified) {
                throw new common_1.BadRequestException('Already verified');
            }
            user.isVerified = true;
            yield this.update(user.id, user);
            return true;
        });
    }
    login(vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = vm;
            let user;
            try {
                user = yield this.findOne({ email });
            }
            catch (e) {
                throw new common_1.InternalServerErrorException(e);
            }
            if (!user) {
                throw new common_1.NotFoundException('Invalid Credentials');
            }
            const isMatched = yield bcryptjs_1.compare(password, user.password);
            if (!isMatched) {
                throw new common_1.BadRequestException('Invalid Credentials');
            }
            const result = Object.assign({}, user.toJSON());
            delete result.password;
            const payload = { email: result.email };
            const token = yield this._authService.signIn(payload);
            return {
                token,
                info: Object.assign({}, result),
            };
        });
    }
    updateFcmToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                user = yield this.findById(userId);
            }
            catch (e) {
                throw new common_1.InternalServerErrorException(e);
            }
            user.fcmToken = token;
            yield this.update(userId, user);
            return true;
        });
    }
    updateProfile(userId, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                user = yield this.findById(userId);
            }
            catch (e) {
                throw new common_1.InternalServerErrorException(e);
            }
            const { firstName, lastName, nickname, organization, phone } = vm;
            user.firstName = firstName;
            user.lastName = lastName;
            user.nickname = nickname;
            user.organization = organization;
            user.phone = phone;
            try {
                return this.update(userId, user);
            }
            catch (e) {
                throw new common_1.InternalServerErrorException(e);
            }
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(common_1.forwardRef(() => auth_service_1.AuthService))),
    __param(1, mongoose_1.InjectModel(user_model_1.User.modelName)),
    __metadata("design:paramtypes", [auth_service_1.AuthService, Object, email_service_1.EmailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map