import { Module } from '@nestjs/common';
import { HomesService } from './homes.service';
import { HomesController } from './homes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from './entities/home.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Home])],
  controllers: [HomesController],
  providers: [HomesService],
  exports: [HomesService],
})
export class HomesModule {}
