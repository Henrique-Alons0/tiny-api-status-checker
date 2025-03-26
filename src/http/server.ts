import http from 'http';
import { parse } from 'url';
import Logger from '../libs/pino/index';
import { checkUrls } from '../checker';
import Database from '../database/database';
import { env } from '../env';

const port = env.PORT;

const getStatus = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
        const rows = await Database.getAllUrlStatuses(10);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify(rows));
    } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify({ error: 'Erro ao consultar o banco de dados' }));
    }
};

const requestHandler = (req: http.IncomingMessage, res: http.ServerResponse) => {
    const parsedUrl = parse(req.url || '', true);

    if (parsedUrl.pathname === '/status' && req.method === 'GET') {
        getStatus(req, res);
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify({ error: 'Rota não encontrada' }));
    }
};

const server = http.createServer(requestHandler);

server.listen(port, () => {
    Logger.info(`🚀 Server is Running in http://localhost:${port}`);
});

Promise.all([
    setInterval(() => checkUrls('urls.json'), env.INTERVAL),
])

