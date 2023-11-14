import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inspection } from './entities/inspection.entity';
import { InspectionsController } from './inspections.controller';
import { InspectionsService } from './inspections.service';
import { HomesModule } from '../homes/homes.module';
import { InspectorsModule } from '../inspectors/inspectors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inspection]),
    HomesModule,
    InspectorsModule,
  ],
  controllers: [InspectionsController],
  providers: [InspectionsService],
  exports: [InspectionsService],
})
export class InspectionsModule {}
