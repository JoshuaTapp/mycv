import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectorsController } from './inspectors.controller';
import { InspectorsService } from './inspectors.service';
import { Inspector } from './entities/inspector.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Inspector]), UsersModule],
  controllers: [InspectorsController],
  providers: [InspectorsService],
  exports: [InspectorsService],
})
export class InspectorsModule {}
