import { ServiceError } from '@grpc/grpc-js';
import { HttpException } from '@nestjs/common';
import { log } from 'console';
import { catchError, Observable } from 'rxjs';
import { errorCodeMap } from '../const/ErrorCodeMap';

export function grpcErrTOHttpErr({
  code,
  message,
}: ServiceError): HttpException {
  const messager = message.replace(/^3 INVALID_ARGUMENT: /, '');
  const httpStatus = errorCodeMap[code];
  console.log(code, message);

  return new HttpException(messager, httpStatus);
}

export function rpcErrorHandling$<T>(elem: Observable<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const subscription = elem
      .pipe(
        catchError((error: ServiceError) => {
          if (error.code === 13) {
            return [];
          }
          log({
            error: error.message,
            code: error.code,
          });
          reject(grpcErrTOHttpErr(error));
          return [];
        }),
      )
      .subscribe({
        error: (error) => {
          reject({
            error: error.message,
            code: error.status,
          });
        },
        next: (res) => {
          log(res);
          resolve(res);
        },
      });

    setTimeout(
      () => {
        subscription.unsubscribe();
        log('Observable unsubscribed');
      },
      15 * 60 * 1000,
    );
  });
}
