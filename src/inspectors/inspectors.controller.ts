import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { InspectorsService } from './inspectors.service';
import { CreateInspectorDto } from './dtos/create-inspector.dto';
import { Inspector } from './entities/inspector.entity';
import { UpdateInspectorDto } from './dtos/update-inspector.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { InspectorDto } from './dtos/inspector.dto';
import { generateInspectors } from '../../utils/generateData';
import { UsersService } from '../users/users.service';

@Serialize(InspectorDto)
@Controller('inspectors')
export class InspectorsController {
  constructor(
    private readonly inspectorsService: InspectorsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  findAll(): Promise<Inspector[]> {
    return this.inspectorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Inspector> {
    return this.inspectorsService.findOne(+id);
  }

  @Post('/create')
  async create(
    @Body() createInspectorDto: CreateInspectorDto,
  ): Promise<Inspector> {
    const inspector = await this.inspectorsService.findByEmail(
      createInspectorDto.email,
    );

    if (inspector) {
      throw new BadRequestException('Inspector with this email already exists');
    }

    console.log('createInspectorDto', createInspectorDto);
    let obj = this.inspectorsService.create(createInspectorDto);
    console.log('after create in controller');
    return obj;
  }

  @Patch('/:id')
  updateInspector(@Param('id') id: string, @Body() body: UpdateInspectorDto) {
    return this.inspectorsService.update(+id, body);
  }

  @Delete('delete/:id')
  removeInspector(@Param('id') id: string) {
    return this.inspectorsService.remove(+id);
  }

  // @Get('/generate-inspectors/:numInspectors')
  // async generateInspectors(@Param('numInspectors') numInspectors: number) {
  //   const users = await this.usersService.findAll();
  //   const emails = users.map((user) => user.email);
  //   const sample = [];
  //   while (sample.length < numInspectors) {
  //     const randomIndex = Math.floor(Math.random() * emails.length);
  //     const randomEmail = emails[randomIndex];
  //     if (!sample.includes(randomEmail)) {
  //       sample.push(randomEmail);
  //     }
  //   }
  //   const inspectors = generateInspectors(numInspectors);

  //   for (let i = 0; i < numInspectors; i++) {
  //     const createInspectorDto = new CreateInspectorDto();
  //     createInspectorDto.email = sample[i];
  //     createInspectorDto.firstName = inspectors[i].firstName;
  //     createInspectorDto.lastName = inspectors[i].lastName;
  //     createInspectorDto.phoneNumber = inspectors[i].phoneNumber;
  //     createInspectorDto.fireLevel = inspectors[i].fireLevel;
  //     createInspectorDto.structuralLevel = inspectors[i].structuralLevel;
  //     createInspectorDto.plumbingLevel = inspectors[i].plumbingLevel;
  //     createInspectorDto.electricalLevel = inspectors[i].electricalLevel;
  //     inspectors.push(await this.inspectorsService.create(createInspectorDto));
  //   }
  // }
}
