import Logger from '../libs/pino/index';

export class SmsReports {
    constructor() {
        Logger.warn('[Resource Not Available] - A sms report can be implemented here');
    }

    public static sendSmsReport(): void {
        Logger.warn('[Resource Not Available] - A sms report can be implemented here');
        throw new Error('[Resource Not Available] - A sms report can be implemented here');
    }
}