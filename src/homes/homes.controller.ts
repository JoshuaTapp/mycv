import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HomesService } from './homes.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { Home } from './entities/home.entity';

@Controller('homes')
export class HomesController {
  constructor(private readonly homesService: HomesService) {}

  @Post('/create-home')
  create(@Body() createHomeDto: CreateHomeDto): Promise<Home> {
    return this.homesService.create(createHomeDto);
  }

  @Get('/all-homes')
  findAll(): Promise<Home[]> {
    return this.homesService.findAll();
  }

  @Get('/find-home/:id')
  findOne(@Param('id') id: string): Promise<Home> {
    return this.homesService.findOne(+id);
  }

  @Get('/find-home-by-zip/:zip')
  findByZip(@Param('zip') zip: string): Promise<Home[]> {
    return this.homesService.findByZip(zip);
  }

  @Patch('update-home/:id')
  update(
    @Param('id') id: string,
    @Body() updateHomeDto: UpdateHomeDto,
  ): Promise<Home> {
    return this.homesService.update(+id, updateHomeDto);
  }

  @Delete('delete-home/:id')
  remove(@Param('id') id: string) {
    return this.homesService.remove(+id);
  }
}
