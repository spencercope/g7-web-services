export declare class EmailContent {
    html: string;
    subject: string;
    text?: string;
}
export declare class EmailData {
    [key: string]: any;
}
export declare class EmailService {
    private readonly _emailAuthUsername;
    private readonly _emailAuthPassword;
    private readonly _rootDir;
    private readonly _defaultBody;
    private readonly _templateHtml;
    private readonly _templateText;
    private _email;
    private _fromEmail;
    private _toEmail;
    constructor();
    sendEmail(templateName: string, to: string | string[], from?: string, data?: EmailData): Promise<void>;
    private initializeEmail;
    private prepareTemplate;
    private addContentToTemplate;
    private initializeBaseTemplate;
    private getDefaultEmailTemplate;
    private isTemplateExist;
}
