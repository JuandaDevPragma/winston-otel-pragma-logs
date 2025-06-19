# winston-otel-pragma-logs

## Description
An OpenTelemetry (OTEL) implementation for Winston that provides tracing for AWS Lambda functions in Node.js.

## Installation

```bash
npm install winston-otel-pragma-logs
```

## Requirements
This package has the following peer dependencies:
- @opentelemetry/api: ^1.9.0
- @opentelemetry/auto-instrumentations-node: ^0.52.0
- @opentelemetry/exporter-trace-otlp-http: ^0.52.0
- @opentelemetry/instrumentation-aws-lambda: ^0.52.0
- @opentelemetry/resources: ^1.19.0
- @opentelemetry/sdk-node: ^0.52.1
- @opentelemetry/semantic-conventions: ^1.19.0
- winston: ^3.17.0

## Usage

### Basic Configuration

```javascript
import { logger, wrapLambdaHandler } from 'winston-otel-pragma-logs';

// Original Lambda function
const myHandler = async (event, context) => {
  // Log a message with tracing information
  logger.info('Processing event', { action: { eventData: event } });
  
  // Your business logic here
  const result = await processData(event);
  
  logger.info('Processing completed', { action: { result: result } });
  return result;
};

// Export the wrapped handler with tracing
export const handler = wrapLambdaHandler(myHandler);
```

### Environment Variables Configuration

The package uses the following environment variables:

- `OTEL_EXPORTER_OTLP_ENDPOINT`: URL of the endpoint to export OTLP traces (e.g., "https://api.honeycomb.io/v1/traces")
- `OTEL_SERVICE_NAME`: Service name to identify your application in traces (default: "default-lambda")

## Log Format

The generated logs automatically include tracing information in JSON format:

```json
{
  "timestamp": "2023-06-15T12:34:56.789Z",
  "tracing": {
    "traceId": "abcdef1234567890abcdef1234567890",
    "spanId": "abcdef1234567890"
  },
  "level": "info",
  "message": "Log message",
  "data": {
    "key": "value",
    "otherData": 123
  }
}
```

## Features

- Automatic integration of Winston with OpenTelemetry
- Wrapper for Lambda functions that automatically creates spans
- Automatic correlation between logs and traces
- Automatic instrumentation for AWS Lambda and other Node.js libraries
- Export traces to any OTLP-compatible backend

## Spanish Documentation
For Spanish documentation, please see [README.es.md](README.es.md).

## License
Developed by [juan.ojeda@pragma.com.co](mailto:juan.ojeda@pragma.com.co)