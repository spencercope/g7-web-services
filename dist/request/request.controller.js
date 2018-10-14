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
const request_model_1 = require("./models/request.model");
const request_service_1 = require("./request.service");
const passport_1 = require("@nestjs/passport");
let RequestController = class RequestController {
    constructor(_requestService) {
        this._requestService = _requestService;
    }
    create(vm) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(vm);
            return this._requestService.createRequest(vm);
        });
    }
    updateRequest(req, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestId = req.request.id;
            return this._requestService.updateRequest(requestId, vm);
        });
    }
    getRequestByReciver(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestId = req.body.receiverId;
            return this._requestService.getRequestByReciver(requestId);
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._requestService.getAll();
        });
    }
};
__decorate([
    common_1.Post('create'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_model_1.HelpRequest]),
    __metadata("design:returntype", Promise)
], RequestController.prototype, "create", null);
__decorate([
    common_1.Post('update-request'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_model_1.HelpRequest]),
    __metadata("design:returntype", Promise)
], RequestController.prototype, "updateRequest", null);
__decorate([
    common_1.Get('receiver'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RequestController.prototype, "getRequestByReciver", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RequestController.prototype, "get", null);
RequestController = __decorate([
    common_1.Controller('requests'),
    __metadata("design:paramtypes", [request_service_1.RequestService])
], RequestController);
exports.RequestController = RequestController;
//# sourceMappingURL=request.controller.js.map