/*
 * Copyright (c) 2024 YuJie Ge(Smile)
 * Licensed under the MIT License.
 */
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service';

@Controller()
@ApiTags('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
