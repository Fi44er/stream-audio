import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GrpcErrorInterceptor implements NestInterceptor {
  private errorCodeMap: { [key: number]: HttpStatus } = {
    0: HttpStatus.OK, // OK
    1: HttpStatus.BAD_REQUEST, // CANCELLED
    2: HttpStatus.INTERNAL_SERVER_ERROR, // UNKNOWN
    3: HttpStatus.BAD_REQUEST, // INVALID_ARGUMENT
    4: HttpStatus.REQUEST_TIMEOUT, // DEADLINE_EXCEEDED
    5: HttpStatus.NOT_FOUND, // NOT_FOUND
    6: HttpStatus.CONFLICT, // ALREADY_EXISTS
    7: HttpStatus.FORBIDDEN, // PERMISSION_DENIED
    16: HttpStatus.UNAUTHORIZED, // UNAUTHENTICATED
    8: HttpStatus.TOO_MANY_REQUESTS, // RESOURCE_EXHAUSTED
    9: HttpStatus.BAD_REQUEST, // FAILED_PRECONDITION
    10: HttpStatus.CONFLICT, // ABORTED
    11: HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE, // OUT_OF_RANGE
    12: HttpStatus.NOT_IMPLEMENTED, // UNIMPLEMENTED
    13: HttpStatus.INTERNAL_SERVER_ERROR, // INTERNAL
    14: HttpStatus.SERVICE_UNAVAILABLE, // UNAVAILABLE
    15: HttpStatus.GONE, // DATA_LOSS
  };

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        const errorCode = error.code;
        const httpStatus = this.errorCodeMap[errorCode];

        if (httpStatus) {
          throw new HttpException(error.details, httpStatus);
        } else {
          return throwError(error);
        }        
      })
    );
  }
}
