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
import { UsersService } from '../users/users.service';
import { CreateInspectorDto } from './dtos/create-inspector.dto';
import { Inspector } from './inspector.entity';
import { User } from '../users/user.entity';
import { UpdateInspectorDto } from './dtos/update-inspector.dto';

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
  findOne(@Param('id') id: string): Promise<Inspector> {
    return this.inspectorsService.findOne(+id);
  }

  @Post()
  async create(
    @Body() createInspectorDto: CreateInspectorDto,
  ): Promise<Inspector> {
    const inspector = await this.inspectorsService.findByEmail(
      createInspectorDto.email,
    );

    if (inspector) {
      throw new BadRequestException('Inspector with this email already exists');
    }

    // if first or last name are not provided, throw an error
    if (!createInspectorDto.firstName || !createInspectorDto.lastName) {
      throw new BadRequestException('First and last name are required');
    }

    // construct a new inspector object and assign the properties from the dto
    let newInspector = new Inspector();
    newInspector.firstName = createInspectorDto.firstName;
    newInspector.lastName = createInspectorDto.lastName;
    newInspector.email = createInspectorDto.email;
    newInspector.phoneNumber = createInspectorDto.phoneNumber;
    newInspector.fireLevel = createInspectorDto.fireLevel | 0;
    newInspector.structuralLevel = createInspectorDto.structuralLevel | 0;
    newInspector.plumbingLevel = createInspectorDto.plumbingLevel | 0;
    newInspector.electricalLevel = createInspectorDto.electricalLevel | 0;
    newInspector.districts = createInspectorDto.districts;

    const user = await this.usersService.findOneByEmail(
      createInspectorDto.email,
    );
    newInspector.user = user;

    return this.inspectorsService.create(newInspector);
  }

  @Patch('/:id')
  updateInspector(@Param('id') id: string, @Body() body: UpdateInspectorDto) {
    return this.inspectorsService.update(+id, body);
  }
}
