/*
 * Copyright (c) 2024 YuJie Ge(Smile)
 * Licensed under the MIT License.
 */
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    const user = this.userRepository.create({ ...createUserDto, password: hashedPassword })
    return this.userRepository.save(user)
  }

  async findByPhone(phone: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { phone } })
  }

  async validateUser(phone: string, password: string): Promise<any> {
    const user = await this.findByPhone(phone)
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  login(user: User) {
    const payload = { phone: user.phone, sub: user.id }
    const access_token = this.jwtService.sign(payload)
    return access_token
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } })
  }
}
