import winston from 'winston';

class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/library.log' })
      ],
    });
  }

  public logInfo(message: string): void {
    this.logger.info(message);
  }

  public logError(message: string): void {
    this.logger.error(message);
  }
}

export default new Logger();
