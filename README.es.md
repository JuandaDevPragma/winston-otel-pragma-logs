# winston-otel-pragma-logs

## Descripción
Una implementación de OpenTelemetry (OTEL) para Winston que proporciona trazabilidad para funciones AWS Lambda en Node.js.

## Instalación

```bash
npm install winston-otel-pragma-logs
```

## Requisitos
Este paquete tiene las siguientes dependencias:
- @opentelemetry/api: ^1.9.0
- @opentelemetry/auto-instrumentations-node: ^0.52.0
- @opentelemetry/exporter-trace-otlp-http: ^0.52.0
- @opentelemetry/instrumentation-aws-lambda: ^0.52.0
- @opentelemetry/resources: ^1.19.0
- @opentelemetry/sdk-node: ^0.52.1
- @opentelemetry/semantic-conventions: ^1.19.0
- winston: ^3.17.0

## Uso

### Configuración básica

```javascript
import { logger, wrapLambdaHandler } from 'winston-otel-pragma-logs';

// Función Lambda original
const myHandler = async (event, context) => {
  // Registrar un mensaje con información de trazabilidad
  logger.info('Procesando evento', { action: { eventData: event } });
  
  // Tu lógica de negocio aquí
  const result = await procesarDatos(event);
  
  logger.info('Procesamiento completado', { action: { resultado: result } });
  return result;
};

// Exportar el handler envuelto con trazabilidad
export const handler = wrapLambdaHandler(myHandler);
```

### Configuración de variables de entorno

El paquete utiliza las siguientes variables de entorno:

- `OTEL_EXPORTER_OTLP_ENDPOINT`: URL del endpoint para exportar trazas OTLP (por ejemplo, "https://api.honeycomb.io/v1/traces")
- `OTEL_SERVICE_NAME`: Nombre del servicio para identificar tu aplicación en las trazas (por defecto: "default-lambda")

## Formato de logs

Los logs generados incluyen automáticamente información de trazabilidad en formato JSON:

```json
{
  "timestamp": "2023-06-15T12:34:56.789Z",
  "tracing": {
    "traceId": "abcdef1234567890abcdef1234567890",
    "spanId": "abcdef1234567890"
  },
  "level": "info",
  "message": "Mensaje de log",
  "data": {
    "clave": "valor",
    "otrosDatos": 123
  }
}
```

## Características

- Integración automática de Winston con OpenTelemetry
- Wrapper para funciones Lambda que crea spans automáticamente
- Correlación automática entre logs y trazas
- Instrumentación automática para AWS Lambda y otras bibliotecas de Node.js
- Exportación de trazas a cualquier backend compatible con OTLP

## Licencia
Desarrollado por [juan.ojeda@pragma.com.co](mailto:juan.ojeda@pragma.com.co)