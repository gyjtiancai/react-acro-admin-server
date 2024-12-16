/*
 * Copyright (c) 2024 YuJie Ge(Smile)
 * Licensed under the MIT License.
 */
import { IsString } from '@nestjs/class-validator'

export class LoginDto {
  @IsString()
  readonly phone: string

  @IsString()
  readonly password: string
}
