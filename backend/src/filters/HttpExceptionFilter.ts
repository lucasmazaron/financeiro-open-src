import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  getExceptionMessage(exception: any) {
    if (!!exception['response']?.message) {
      return exception['response']?.message;
    } else if (!!exception['error']?.error) {
      return exception['error'].error;
    } else if (!!exception['message']) {
      return exception['message'];
    } else if (exception instanceof HttpException) {
      return exception.getResponse();
    } else {
      return exception;
    }
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = this.getExceptionMessage(exception);

    const erroData = `Path: ${
      request.url
    } | Http Status: ${status} | Error Message: ${JSON.stringify(message)} `;

    this.logger.error(erroData);
    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
