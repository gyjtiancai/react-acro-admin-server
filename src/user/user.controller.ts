/*
 * Copyright (c) 2024 YuJie Ge(Smile)
 * Licensed under the MIT License.
 */
import { Controller, Post, Body, UseGuards, Req, Get, Res, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginDto } from './dto/login.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    if (!createUserDto.phone || !createUserDto.password) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        data: '',
        message: '手机号或密码不能为空'
      })
    }
    const user = await this.userService.findByPhone(createUserDto.phone)
    if (user) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        data: '',
        message: '用户已注册'
      })
    }
    const result = await this.userService.create(createUserDto)
    return res.status(HttpStatus.OK).json({
      data: result,
      message: '注册成功'
    })
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const user = await this.userService.validateUser(loginDto.phone, loginDto.password)
    if (!user) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        data: '',
        message: '手机或密码错误'
      })
    }
    const access_token = this.userService.login(user)
    return res.status(HttpStatus.OK).json({
      data: access_token,
      message: '登录成功'
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getCurrentUser(@Req() req: Request) {
    return req.user
  }
}
