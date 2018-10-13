import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as EmailTemplate from 'email-templates';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export class EmailContent {
  html: string;
  subject: string;
  text?: string;
}

export class EmailData {
  [key: string]: any;
}

@Injectable()
export class EmailService {
  private readonly _emailAuthUsername: string;
  private readonly _emailAuthPassword: string;
  private readonly _rootDir: string;

  private readonly _defaultBody: string;
  private readonly _templateHtml: string;
  private readonly _templateText: string;

  private _email: EmailTemplate;
  private _fromEmail: string;
  private _toEmail: string;

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

  async sendEmail(templateName: string, to: string | string[], from?: string, data?: EmailData) {
    if (!this.isTemplateExist(templateName)) {
      throw new HttpException(`Template not found ${templateName}`, HttpStatus.NOT_FOUND);
    }

    const emailContent: EmailContent = await this.prepareTemplate(templateName, data);

    if (typeof(to).toString().toLowerCase() === 'object') {
      to = (to as string[]).join(' ');
    }

    const emailOptions: any = {
      message: { to, ...emailContent },
    };

    if (from && from !== this._fromEmail) {
      emailOptions.message.from = from;
    }

    try {
      await this._email.send(emailOptions);
    } catch (e) {
      throw new Error('Cannot send email');
    }
  }

  private initializeEmail(): void {
    const emailConfig = this.getDefaultEmailTemplate();
    this._email = new EmailTemplate(emailConfig);
  }

  private async prepareTemplate(templateName: string, data: EmailData): Promise<EmailContent> {
    try {
      const emailContent: EmailContent = await this._email.renderAll(templateName, data);
      const bodyHtml = this.addContentToTemplate(this._templateHtml, emailContent.html);
      const bodyText = this.addContentToTemplate(this._templateText, emailContent.text);
      return {
        ...emailContent,
        html: bodyHtml,
        text: bodyText,
      };
    } catch (e) {
      throw new Error(`Error preparing Template ${templateName}`);
    }
  }

  private addContentToTemplate(template: string, content: string): string {
    return template.replace(this._defaultBody, content);
  }

  private initializeBaseTemplate(path: string): string {
    return readFileSync(join(this._rootDir, path), 'utf8');
  }

  private getDefaultEmailTemplate() {
    /**
     * * send to true, preview to false and jsonTransport to false to actually send Email
     */
    return {
      message: { from: this._fromEmail },
      views: { root: this._rootDir, options: { extension: 'hbs' } },
      jsonTransport: true,
      // send: true,
      // preview: false,
      transport: {
        service: 'gmail',
        auth: {
          user: this._emailAuthUsername,
          pass: this._emailAuthPassword,
        },
      },
    };
  }

  private isTemplateExist(templateName: string): boolean {
    return existsSync(join(this._rootDir, templateName));
  }
}