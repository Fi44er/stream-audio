import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { errorCodeMap } from 'apps/gateway/lib/const/ErrorCodeMap';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GrpcErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const errorCode = error.code;
        const httpStatus = errorCodeMap[errorCode];

        if (httpStatus) {
          throw new HttpException(error.details, httpStatus);
        } else {
          return throwError(error);
        }
      }),
    );
  }
}
