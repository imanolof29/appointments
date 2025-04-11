import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './contexts/users/infrastructure/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseNormalizerModule } from './app/http/response-normalizer/response-normalizer.module';
import { AuthModule } from './contexts/auth/infrastructure/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './contexts/shared/infrastructure/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'imanolortiz',
      password: '',
      database: 'appointments',
      entities: [__dirname + '/**/infrastructure/entity/*.entity{.ts,.js}'],
      synchronize: true
    }),
    UsersModule,
    AuthModule,
    ResponseNormalizerModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
