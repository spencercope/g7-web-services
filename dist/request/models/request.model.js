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
const shared_model_1 = require("../../shared/shared.model");
const typegoose_1 = require("typegoose");
class HelpRequest extends shared_model_1.SharedModel {
    static get model() {
        return new HelpRequest().getModelForClass(HelpRequest);
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
], HelpRequest.prototype, "title", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], HelpRequest.prototype, "description", void 0);
__decorate([
    typegoose_1.prop({ default: false, required: true }),
    __metadata("design:type", Boolean)
], HelpRequest.prototype, "isRejected", void 0);
__decorate([
    typegoose_1.prop({ default: false, required: true }),
    __metadata("design:type", Boolean)
], HelpRequest.prototype, "isApproved", void 0);
__decorate([
    typegoose_1.prop({ default: false, required: true }),
    __metadata("design:type", Boolean)
], HelpRequest.prototype, "isComplete", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], HelpRequest.prototype, "senderId", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], HelpRequest.prototype, "receiverId", void 0);
exports.HelpRequest = HelpRequest;
//# sourceMappingURL=request.model.js.map