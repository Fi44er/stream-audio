/* eslint-disable @typescript-eslint/no-unused-vars */
import { ServiceError } from '@grpc/grpc-js';
import { HttpException, HttpStatus } from '@nestjs/common';
import { log } from 'console';
import { catchError, Observable, timer } from 'rxjs';

export function grpcErrTOHttpErr({
  code,
  message,
}: ServiceError): HttpException {
  const errorCodeMap: { [key: number]: HttpStatus } = {
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
  const messager = message.replace(/^3 INVALID_ARGUMENT: /, '');
  const httpStatus = errorCodeMap[code];
  throw new HttpException(messager, httpStatus);
}

export function observable$<T>(elem: Observable<T>): Promise<T> {
  const observable$ = elem
    .pipe(
      catchError((error: ServiceError) => {
        throw grpcErrTOHttpErr(error);
      }),
    )
    .subscribe({
      error: (error) => {
        log({
          error: error.message,
          code: error.status,
        });
      },
      next: (res) => log(res),
    });

  timer(15 * 60 * 1000).subscribe(() => {
    observable$.unsubscribe();
    log('Observable unsubscribed');
  });
  return;
}
