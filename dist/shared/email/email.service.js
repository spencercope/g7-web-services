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
const EmailTemplate = require("email-templates");
const fs_1 = require("fs");
const path_1 = require("path");
class EmailContent {
}
exports.EmailContent = EmailContent;
class EmailData {
}
exports.EmailData = EmailData;
let EmailService = class EmailService {
    constructor() {
        this._fromEmail = 'nartc1410@gmail.com';
        this._emailAuthUsername = 'nartc1410@gmail.com';
        this._emailAuthPassword = 'chau1410';
        this._defaultBody = '{{ _body }}';
        this._rootDir = './templates';
        this.initializeEmail();
        this._templateHtml = this.initializeBaseTemplate('template.html');
        this._templateText = this.initializeBaseTemplate('template.txt');
    }
    sendEmail(templateName, to, from, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isTemplateExist(templateName)) {
                throw new common_1.HttpException(`Template not found ${templateName}`, common_1.HttpStatus.NOT_FOUND);
            }
            const emailContent = yield this.prepareTemplate(templateName, data);
            if (typeof (to).toString().toLowerCase() === 'object') {
                to = to.join(' ');
            }
            const emailOptions = {
                message: Object.assign({ to }, emailContent),
            };
            if (from && from !== this._fromEmail) {
                emailOptions.message.from = from;
            }
            try {
                yield this._email.send(emailOptions);
            }
            catch (e) {
                throw new Error('Cannot send email');
            }
        });
    }
    initializeEmail() {
        const emailConfig = this.getDefaultEmailTemplate();
        this._email = new EmailTemplate(emailConfig);
    }
    prepareTemplate(templateName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emailContent = yield this._email.renderAll(templateName, data);
                const bodyHtml = this.addContentToTemplate(this._templateHtml, emailContent.html);
                const bodyText = this.addContentToTemplate(this._templateText, emailContent.text);
                return Object.assign({}, emailContent, { html: bodyHtml, text: bodyText });
            }
            catch (e) {
                throw new Error(`Error preparing Template ${templateName}`);
            }
        });
    }
    addContentToTemplate(template, content) {
        return template.replace(this._defaultBody, content);
    }
    initializeBaseTemplate(path) {
        return fs_1.readFileSync(path_1.join(this._rootDir, path), 'utf8');
    }
    getDefaultEmailTemplate() {
        return {
            message: { from: this._fromEmail },
            views: { root: this._rootDir, options: { extension: 'hbs' } },
            jsonTransport: true,
            transport: {
                service: 'gmail',
                auth: {
                    user: this._emailAuthUsername,
                    pass: this._emailAuthPassword,
                },
            },
        };
    }
    isTemplateExist(templateName) {
        return fs_1.existsSync(path_1.join(this._rootDir, templateName));
    }
};
EmailService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map