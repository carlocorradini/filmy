import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: process.env.LOG_PRETTY === 'true',
});

logger.debug('Logger successfully created');

export default logger;
