import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';

const logDir: string = 'log';
const logFile: string = 'data.log';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.label({
      label: path.basename(process.mainModule !== undefined ? process.mainModule.filename : '?'),
    }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    })
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf((info) => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)
      ),
    }),
    new transports.File({
      filename: path.join(logDir, logFile),
      format: format.combine(
        format.printf((info) => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)
      ),
    }),
  ],
});

export default logger;
