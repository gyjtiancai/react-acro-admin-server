/*
 * Copyright (c) 2024 YuJie Ge(Smile)
 * Licensed under the MIT License.
 */
import { Module, MiddlewareConsumer } from '@nestjs/common'
import { CorsMiddleware } from '@nest-middlewares/cors'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HttpMiddleware } from './middleware'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysql@geyujie',
      database: 'db_template',
      synchronize: true,
      autoLoadEntities: true,
      retryDelay: 500,
      retryAttempts: 5
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware, HttpMiddleware).forRoutes('*')
  }
}
