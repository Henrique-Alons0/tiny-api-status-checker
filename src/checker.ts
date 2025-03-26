import fs from 'fs';
import chalk from 'chalk';
import Logger from './libs/pino/index';
import DatabaseOperations from './database/database';
import Database from './database/database';
import StatusFormatter from './utils/status-formatter';

const checkDatabaseUrls = async () => {
    Logger.info('🔄 Checking URL status...');

    try {
        const rows = await Database.getAllUrlStatuses(10);
        Logger.info('✅ Verified URLs Status:');
        rows.forEach((row) => {
            const statusFormatted = StatusFormatter.formatStatus(row.status);
            const statusCode = Number(row.status);

            if (statusCode >= 100 && statusCode < 200) {
                Logger.info(`🌐 ${row.url} - Last Checked: ${row.last_checked} - (${statusFormatted}) ℹ️ Continue`);
            } else if (statusCode >= 200 && statusCode < 300) {
                Logger.info(`🌐 ${row.url} - Last Checked: ${row.last_checked} - (${statusFormatted}) ✅ Available`);
            } else if (statusCode >= 300 && statusCode < 400) {
                Logger.info(`🌐 ${row.url} - Last Checked: ${row.last_checked} - (${statusFormatted}) ⤴️ Redirect`);
            } else if (statusCode >= 400 && statusCode < 500) {
                Logger.info(`🌐 ${row.url} - Last Checked: ${row.last_checked} - (${statusFormatted}) ❌ Client Error`);
            } else if (statusCode >= 500 && statusCode < 600) {
                Logger.info(`🌐 ${row.url} - Last Checked: ${row.last_checked} - (${statusFormatted}) ❌ Server Error`);
            } else {
                Logger.info(`🌐 ${row.url} - Last Checked: ${row.last_checked} - (${statusFormatted}) ❌ Unknown Error`);
            }
        });
    } catch (err) {
        Logger.error('❌ Error querying database:', err);
    }
}

const fetchUrlStatus = async (url: string): Promise<{ url: string, status: string }> => {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        const status = response.status;
        
        DatabaseOperations.insertUrlStatus(url, status.toString());
        checkDatabaseUrls();
        return { url, status: status.toString() };
    } catch (error) {
        Logger.error(chalk.red(`❌ [ERROR] ${url} - ${(error as Error).message}`));
        DatabaseOperations.insertUrlStatus(url, 'ERROR');
        return { url, status: 'ERROR' };
    }
};

export const checkUrls = async (filePath: string): Promise<void> => {
        try {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const urls: Array<string> = data.urls || [];
    
            Logger.info(chalk.blue(`🔍 Checking ${urls.length} URLs...\n`));
    
            const urlPromises = urls.map(url => fetchUrlStatus(url));
            await Promise.allSettled(urlPromises);
    
        } catch (error) {
            Logger.error(chalk.red('❌ [ERROR] - Error reading URL file:', (error as Error).message || 'Unknown error'));
        }
};

export const startUrlChecker = (filePath: string, interval: number): void => {
    checkUrls(filePath);

    setInterval(() => {
        checkUrls(filePath);
    }, interval);
};
