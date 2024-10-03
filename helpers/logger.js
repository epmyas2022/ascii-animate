import winston from "winston";
import format from "date-format";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: {},
  transports: [
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "./logs/combined.log" }),
  ],
  exitOnError: false,
});

const myFormat = winston.format.printf(({ level, message }) => {
  const formatTimestamp = format("yyyy-MM-dd hh:mm:ss", new Date());
  return `${formatTimestamp} ${level}: ${message}`;
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.simple(), myFormat),
    })
  );
}

export default logger;
