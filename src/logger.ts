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
            const error: any = obj.error;
            const transactionId = obj.transactionId;

            const log = {
                timestamp,
                severity: level,
                transactionId: transactionId ?? 'Id Not Available',
                message,
                appName: process.env.OTEL_SERVICE_NAME,
                appNamespace: process.env.OTEL_SERVICE_NAMESPACE ?? 'namespaceTest',
                tracing: {
                    traceId,
                    spanId
                },
                action: payload,
                error: error
            };

            return JSON.stringify(log);
        })
    ),
    transports: [new winston.transports.Console()],
});
