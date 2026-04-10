import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  health() {
    return {
      message: 'CareSlot API is running...',
      data: null
    };
  }
}