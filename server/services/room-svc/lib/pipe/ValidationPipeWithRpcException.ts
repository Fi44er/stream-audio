import { applyDecorators, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { ValidationError } from 'class-validator';

export function ValidationPipeWithRpcException() {
  return applyDecorators(
    UsePipes(
      new ValidationPipe({
        exceptionFactory: (errors: ValidationError[]) => {
          const validationErrors = errors.map((error) => {
            return {
              field: error.property,
              message: Object.values(error.constraints).join(', '),
            };
          });
          return new RpcException({
            message: 'Validation failed',
            code: status.INVALID_ARGUMENT,
            details: {
              validationErrors,
            },
          });
        },
      }),
    ),
  );
}
