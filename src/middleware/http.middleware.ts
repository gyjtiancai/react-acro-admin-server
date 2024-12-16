/*
 * Copyright (c) 2024 YuJie Ge(Smile)
 * Licensed under the MIT License.
 */
import { Injectable, NestMiddleware, Req } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class HttpMiddleware implements NestMiddleware {
  use(@Req() req: Request, res: Response, next: NextFunction) {
    next()
  }
}
