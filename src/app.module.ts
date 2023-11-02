import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/user.entity';
import { Report } from './reports/reports.entity';
import { TypeOrmConfigService } from './config/typeorm.config';
import { InspectorsService } from './inspectors/inspectors.service';
import { InspectorsController } from './inspectors/inspectors.controller';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    // setting up .env config for nest. This is a PIA!
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController, InspectorsController],
  providers: [
    AppService,
    // how to set up a globally scoped pipe
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    InspectorsService,
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
  // how to setup globally scoped middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
