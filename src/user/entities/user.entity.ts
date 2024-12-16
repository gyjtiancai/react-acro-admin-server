/*
 * Copyright (c) 2024 YuJie Ge(Smile)
 * Licensed under the MIT License.
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', { comment: 'uuid' })
  id: string

  @Column({ unique: true, comment: '手机号' })
  phone: string

  @Column({ comment: '用户名', default: '' })
  username: string

  @Column({ comment: '密码', default: '' })
  password: string

  @Column({ comment: '头像', default: '' })
  avatar: string
}
