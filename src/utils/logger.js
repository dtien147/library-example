const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create the logger
const logger = createLogger({
  level: 'info', // default log level
  format: combine(
    timestamp(),    // Adds timestamps to logs
    colorize(),     // Adds color to the console logs
    logFormat       // Uses the custom log format
  ),
  transports: [
    new transports.Console(),  // Log to console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to file
    new transports.File({ filename: 'logs/combined.log' })  // Log all info-level and higher to a file
  ]
});

// Export the logger
module.exports = logger;
