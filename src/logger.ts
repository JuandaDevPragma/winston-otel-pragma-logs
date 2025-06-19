import * as winston from "winston";
import './tracing';
import {getCurrentTrace} from "./tracing";

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({level, message, timestamp, ...obj} ) => {
            const { traceId, spanId } = getCurrentTrace();

            const log = {
                timestamp,
                tracing: {
                    traceId,
                    spanId
                },
                level,
                message,
                data: obj.action
            };

            return JSON.stringify(log);
        })
    ),
    transports: [new winston.transports.Console()],
});
