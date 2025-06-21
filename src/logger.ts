import * as winston from "winston";
import  * as moment from "moment-timezone";
import './tracing';
import {getCurrentTrace} from "./tracing";

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: () => moment.tz('America/Bogota').format('YYYY-MM-DDTHH:mm:ss.SSS')
        }),
        winston.format.printf(({level, message, timestamp, ...obj} ) => {
            const { traceId, spanId } = getCurrentTrace();

            const payload: any = obj.action;
            const transaction_id = obj.transaction_id;

            const log = {
                timestamp,
                severity: level,
                transaction_id: transaction_id ?? 'Id Not Available',
                message,
                tracing: {
                    traceId,
                    spanId
                },
                action: payload
            };

            return JSON.stringify(log);
        })
    ),
    transports: [new winston.transports.Console()],
});
