import { ServiceError } from '@grpc/grpc-js';
import { HttpException } from '@nestjs/common';
import { log } from 'console';
import { Observable, throwError } from 'rxjs';
import { catchError, of } from 'rxjs';
import { errorCodeMap } from '../const/ErrorCodeMap';

function grpcErrTOHttpErr({ code, message }: ServiceError): HttpException {
  const messager = message.replace(/^3 INVALID_ARGUMENT: /, '');
  const httpStatus = errorCodeMap[code];
  return new HttpException(messager, httpStatus);
}

export async function rpcErrorHandling$<T>(elem: Observable<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const subscription = elem
      .pipe(
        catchError((error: any) => {
          if (error.code === 13) {
            return of(null);
          } else {
            return throwError(grpcErrTOHttpErr(error));
          }
        }),
      )
      .subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (error) => {
          reject(error);
        },
      });
    setTimeout(
      () => {
        subscription.unsubscribe();
        log('Observable unsubscribed');
      },
      15 * 60 * 1000,
    );
  })
    .then((data: Promise<T>) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
