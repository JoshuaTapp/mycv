import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectorsController } from './inspectors.controller';
import { InspectorsService } from './inspectors.service';
import { Inspector } from './inspector.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inspector])],
  controllers: [InspectorsController],
  providers: [InspectorsService],
})
export class InspectorsModule {}
