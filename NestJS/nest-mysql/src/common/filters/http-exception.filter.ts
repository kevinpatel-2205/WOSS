import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const status = exception.getStatus();
        const exceptionResponse: any = exception.getResponse();

        response.status(status).json({
            success: false,
            message: exceptionResponse.message || 'Error',
            error: exceptionResponse.error || 'Bad Request',
        });
    }
}