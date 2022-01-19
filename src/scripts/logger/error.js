const winston = require("winston");
const path = require("path");

const logger = winston.createLogger({
    level: "error",
    format: winston.format.json(),
    defaultMeta: { service: "error-service" },
    transports: [new winston.transports.File({ filename: path.join(__dirname, "../../", "logs/error", "combined.log") })],
});

module.exports = logger;