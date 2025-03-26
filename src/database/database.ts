import db from './seed';
import Logger from '../libs/pino';


export default class Database {
    
    constructor() {}

    public static insertUrlStatus = (url: string, status: string): void => {
        db.get(
            'SELECT * FROM url_status WHERE url = ? ORDER BY last_checked DESC LIMIT 1',
            [url],
            (err, row: Row) => {
                if (err) {
                    Logger.error('❌ Error querying database:', err);
                    return;
                }
    
                if (row && row.status == status) {
                    Logger.info(`ℹ️ Status of ${url} already registered as ${status}, avoiding duplication.`);
                    return;
                }
    
                db.run(
                    'INSERT INTO url_status (url, status, last_checked) VALUES (?, ?, ?)',
                    [url, status, new Date().toISOString()]
                );
            }
        );
    };
    

    public static getAllUrlStatuses(limit: number = 10): Promise<Row[]> {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM url_status ORDER BY last_checked DESC LIMIT ?', [limit], (err, rows) => {
                if (err) {
                    reject('Error querying database');
                } else {
                    resolve(rows as Row[]);
                }
            });
        });
    }

    public static getUrlStatus(url: string): Promise<Row | null> {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM url_status WHERE url = ? ORDER BY last_checked DESC LIMIT 1', [url], (err, row) => {
                if (err) {
                    reject('Error querying database');
                } else {
                    resolve(row as Row | null);
                }
            });
        });
    }

    public static updateUrlStatus(url: string, status: string): void {
        db.run(
            'UPDATE url_status SET status = ?, last_checked = ? WHERE url = ?',
            [status, new Date().toISOString(), url],
            (err) => {
                if (err) {
                    console.error('Error updating URL status:', err);
                }
            }
        );
    }

    public static deleteUrlStatus(url: string): void {
        db.run(
            'DELETE FROM url_status WHERE url = ?',
            [url],
            (err) => {
                if (err) {
                    console.error('Error deleting URL status:', err);
                }
            }
        );
    }
}

interface Row {
    url: string;
    status: string;
    last_checked: string;
}
