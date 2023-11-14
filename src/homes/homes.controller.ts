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
// import { generateHomes } from '../../utils/fakerHomeData';
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

  // ! Do no re-enable this route in production
  // ! It will randomly generate a large number of homes in the database
  // @Get('/generate-random-homes/:numHomes')
  // async generateRandomHomes(@Param('numHomes') numHomes: number) {
  //   const homes = await generateHomes(numHomes);
  //   const createdHomes: Home[] = [];

  //   for (const home of homes) {
  //     const createHomeDto: CreateHomeDto = {
  //       addressField1: home.addressField1.toString(),
  //       addressField2: home.addressField2,
  //       city: home.city,
  //       state: home.state,
  //       zip: home.zipCode,
  //       inspectors: [],
  //     };

  //     const createdHome = await this.homesService.create(createHomeDto);
  //     createdHomes.push(createdHome);
  //   }

  //   return createdHomes;
  // }
}
