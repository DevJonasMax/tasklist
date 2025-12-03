import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();

    let httpException: HttpException;

    switch (exception.code) {
      case 'P2002':
        httpException = new ConflictException('Unique constraint failed');
        break;
      case 'P2003':
        httpException = new BadRequestException('Foreign key constraint failed');
        break;
      case 'P2025':
        httpException = new NotFoundException('Record not found');
        break;
      default:
        httpException = new BadRequestException('Database error');
        break;
    }

    const body = httpException.getResponse() as any;
    res.status(httpException.getStatus()).json(body);
  }
}