import Logger from '../libs/pino/index';

export class EmailReports {
    constructor() {
        Logger.warn('[Resource Not Available] - A email report can be implemented here');
    }

    public static sendEmailReport(): void {
        Logger.warn('[Resource Not Available] - A email report can be implemented here');
        throw new Error('[Resource Not Available] - A email report can be implemented here');
    }
}