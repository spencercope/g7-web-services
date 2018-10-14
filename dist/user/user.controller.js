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
const passport_1 = require("@nestjs/passport");
const user_service_1 = require("./user.service");
const register_model_1 = require("./models/register.model");
const login_model_1 = require("./models/login.model");
const profile_model_1 = require("./models/profile.model");
let UserController = class UserController {
    constructor(_userService) {
        this._userService = _userService;
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._userService.getUsers();
        });
    }
    register(vm) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._userService.register(vm);
        });
    }
    verify(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._userService.verifyEmail(token);
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._userService.findOne({ email });
                return result.toJSON();
            }
            catch (e) {
                throw new common_1.InternalServerErrorException(e);
            }
        });
    }
    login(vm) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._userService.login(vm);
        });
    }
    updateFcmToken(req, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            if (!currentUser.isVerified) {
                throw new common_1.UnauthorizedException('Not verified');
            }
            return this._userService.updateFcmToken(currentUser.id, token);
        });
    }
    updateProfile(req, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.user;
            if (!currentUser.isVerified) {
                throw new common_1.UnauthorizedException('Not verified');
            }
            const result = yield this._userService.updateProfile(currentUser.id, vm);
            return result.toJSON();
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
__decorate([
    common_1.Post('register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_model_1.RegisterModel]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    common_1.Get('verify'),
    __param(0, common_1.Query('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verify", null);
__decorate([
    common_1.Get('by-email'),
    __param(0, common_1.Query('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getByEmail", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_model_1.LoginModel]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    common_1.Put('update-fcm'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Req()), __param(1, common_1.Body('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateFcmToken", null);
__decorate([
    common_1.Put('update-profile'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_model_1.ProfileModel]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
UserController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map