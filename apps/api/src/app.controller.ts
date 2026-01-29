import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): { status: string; message: string } {
    return { status: 'ok', message: 'API Auth rodando com sucesso! 🚀' };
  }
}
