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
const mongoose_1 = require("@nestjs/mongoose");
const shared_service_1 = require("../shared/shared.service");
const user_service_1 = require("../user/user.service");
const fcm_service_1 = require("../shared/fcm/fcm.service");
let RequestService = class RequestService extends shared_service_1.SharedService {
    constructor(_helpRequestModel, _userService, _fcmService) {
        super();
        this._helpRequestModel = _helpRequestModel;
        this._userService = _userService;
        this._fcmService = _fcmService;
        this._model = _helpRequestModel;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.find();
        });
    }
    getRequestByReciver(receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.find({ receiverId: receiverId });
        });
    }
    createRequest(vm) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRequest = new this._model();
            let request;
            let sender;
            let receiver;
            try {
                sender = yield this._userService.findById(vm.senderId);
                receiver = yield this._userService.findById(vm.receiverId);
            }
            catch (e) {
                throw new common_1.InternalServerErrorException(e);
            }
            console.log("SENDER", sender);
            console.log("RECEIVER", receiver);
            const { title, description, receiverId, senderId } = vm;
            newRequest.title = title;
            newRequest.receiverId = receiverId;
            newRequest.senderId = senderId;
            newRequest.description = description;
            try {
                request = yield this.create(newRequest);
            }
            catch (e) {
                throw new common_1.InternalServerErrorException(e);
            }
            if (receiver.isHelper) {
                const message = {
                    title: "Someone is asking for your assistance",
                    subtitle: sender.firstName + " " + sender.lastName,
                    body: sender.firstName + "Needs your help with the following: "
                };
                this._fcmService.sendNotificationToToken(receiver.fcmToken, message).then().catch((e) => console.log(e));
            }
            sender.requests.push(request.id);
            receiver.requests.push(request.id);
            yield this._userService.update(senderId, sender);
            yield this._userService.update(receiverId, receiver);
            return request;
        });
    }
    updateRequest(requestId, vm) {
        return __awaiter(this, void 0, void 0, function* () {
            let _request;
            const { isApproved, isComplete, isRejected } = vm;
            try {
                _request = yield this._userService.findById(requestId);
            }
            catch (e) {
                throw new common_1.InternalServerErrorException(e);
            }
            _request.isApproved = isApproved;
            _request.isComplete = isComplete;
            _request.isRejected = isRejected;
            try {
                return this.update(requestId, _request);
            }
            catch (e) {
                throw new common_1.InternalServerErrorException(e);
            }
        });
    }
};
RequestService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(request_model_1.HelpRequest.modelName)),
    __metadata("design:paramtypes", [Object, user_service_1.UserService,
        fcm_service_1.FcmService])
], RequestService);
exports.RequestService = RequestService;
//# sourceMappingURL=request.service.js.map