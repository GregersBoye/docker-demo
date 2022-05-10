const { createLogger, format, transports } = require('winston');

const {
  combine, timestamp, label, printf,
} = format;
const myFormat = printf(({
  level, message, label, timestamp,
}) => `${timestamp} [${label}] ${level}: ${message}`);
const logger = createLogger({
  level: 'info',

  defaultMeta: { service: 'Api' },
  transports: [],
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
logger.add(new transports.Console({
  format: combine(
    label({ label: 'API' }),
    format.colorize({ all: true }),
    timestamp(),
    myFormat,
  ),
}));
logger.add(new transports.File({
  filename: `${__dirname}/api.log`,
  format: combine(
    label({ label: 'API' }),
    format.colorize({ all: true }),
    timestamp(),
    myFormat,
  ),
}));
module.exports = logger;
