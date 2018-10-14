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
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("typegoose");
const shared_model_1 = require("../../shared/shared.model");
const request_model_1 = require("../../request/models/request.model");
class User extends shared_model_1.SharedModel {
    static get model() {
        return new User().getModelForClass(User);
    }
    static get modelName() {
        return this.model.modelName;
    }
    static get schema() {
        return this.model.schema;
    }
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typegoose_1.prop({ required: true, default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "rating", void 0);
__decorate([
    typegoose_1.prop({ required: true, default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "ratingCount", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isHelper", void 0);
__decorate([
    typegoose_1.prop({ required: true, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    typegoose_1.arrayProp({ default: [], itemsRef: request_model_1.HelpRequest }),
    __metadata("design:type", Array)
], User.prototype, "requests", void 0);
__decorate([
    typegoose_1.prop({ required: false }),
    __metadata("design:type", String)
], User.prototype, "organization", void 0);
__decorate([
    typegoose_1.prop({ required: false }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    typegoose_1.prop({ required: false }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typegoose_1.prop({ required: false }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typegoose_1.prop({ required: false }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    typegoose_1.prop({ required: false }),
    __metadata("design:type", String)
], User.prototype, "fcmToken", void 0);
exports.User = User;
//# sourceMappingURL=user.model.js.map