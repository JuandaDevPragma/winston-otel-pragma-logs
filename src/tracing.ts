import {NodeSDK} from '@opentelemetry/sdk-node';
import {Resource} from '@opentelemetry/resources';
import {ATTR_SERVICE_NAME} from '@opentelemetry/semantic-conventions';
import {OTLPTraceExporter} from '@opentelemetry/exporter-trace-otlp-http';
import {AwsLambdaInstrumentation} from '@opentelemetry/instrumentation-aws-lambda';
import {getNodeAutoInstrumentations} from '@opentelemetry/auto-instrumentations-node';
import {trace} from '@opentelemetry/api';


const traceExporter = process.env.OTEL_EXPORTER_OTLP_ENDPOINT
    ? new OTLPTraceExporter({url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT})
    : undefined;

const sdk = new NodeSDK({
    resource: new Resource({
        [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || 'default-lambda',
    }),
    instrumentations: [
        new AwsLambdaInstrumentation(),
        getNodeAutoInstrumentations()
    ],
    traceExporter: traceExporter
});

sdk.start();

export const tracer = trace.getTracer('default-tracer');

export const getCurrentTrace = () => {
    const activeSpan = trace.getActiveSpan();
    if (!activeSpan) {
        return {
            traceId: 'no-trace-id',
            spanId: 'no-span-id'
        };
    }
    const spanContext = activeSpan.spanContext();
    return {
        traceId: spanContext.traceId,
        spanId: spanContext.spanId
    };
};

process.on('SIGTERM', () => {
    sdk.shutdown().then();
});





