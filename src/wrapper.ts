import { Context } from 'aws-lambda';
import { tracer } from './tracing';
import {Exception} from "@opentelemetry/api";

export const wrapLambdaHandler = (handlerFunction: Function) => {
    return async (event: any, context: Context) => {
        return tracer.startActiveSpan('lambda-execution', async (span) => {
            try {
                const result = await handlerFunction(event, context);
                span.end();
                return result;
            } catch (error) {
                span.recordException(error as Error | Exception);
                span.end();
                throw error;
            }
        });
    };
};
