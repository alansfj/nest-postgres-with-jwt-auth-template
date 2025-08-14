import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class DtoOutputInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private readonly dto: new (...args: any[]) => any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data) return data;

        if (Array.isArray(data)) {
          return data.map((item) =>
            plainToClass(this.dto, instanceToPlain(item)),
          );
        }

        return plainToClass(this.dto, instanceToPlain(data));
      }),
    );
  }
}
