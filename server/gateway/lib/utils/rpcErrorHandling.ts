/* eslint-disable @typescript-eslint/no-unused-vars */
import { ServiceError } from '@grpc/grpc-js';
import { HttpException } from '@nestjs/common';
import { log } from 'console';
import { errorCodeMap } from 'lib/const/ErrorCodeMap';
import { catchError, Observable, timer } from 'rxjs';

export function grpcErrTOHttpErr({
  code,
  message,
}: ServiceError): HttpException {
  const messager = message.replace(/^3 INVALID_ARGUMENT: /, '');
  const httpStatus = errorCodeMap[code];
  throw new HttpException(messager, httpStatus);
}

export function rpcErrorHandling$<T>(elem: Observable<T>): Promise<T> {
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
