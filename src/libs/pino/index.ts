import pino from 'pino';

class Logger {
  private logger: pino.Logger;

  constructor() {
    this.logger = pino({
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
        },
      },
    });
  }

  public info(message: string, ...args: any[]) {
    this.logger.info(message, ...args);
  }

  public error(message: string, ...args: any[]) {
    this.logger.error(message, ...args);
  }

  public warn(message: string, ...args: any[]) {
    this.logger.warn(message, ...args);
  }

  public debug(message: string, ...args: any[]) {
    this.logger.debug(message, ...args);
  }

  public fatal(message: string, ...args: any[]) {
    this.logger.fatal(message, ...args);
  }

  public trace(message: string, ...args: any[]) {
    this.logger.trace(message, ...args);
  }
}

export default new Logger();
