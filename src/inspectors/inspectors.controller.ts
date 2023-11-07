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

@Serialize(InspectorDto)
@Controller('inspectors')
export class InspectorsController {
  constructor(private readonly inspectorsService: InspectorsService) {}

  @Get()
  findAll(): Promise<Inspector[]> {
    return this.inspectorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Inspector> {
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

    return this.inspectorsService.create(createInspectorDto);
  }

  @Patch('/:id')
  updateInspector(@Param('id') id: string, @Body() body: UpdateInspectorDto) {
    return this.inspectorsService.update(+id, body);
  }

  @Delete('delete/:id')
  removeInspector(@Param('id') id: string) {
    return this.inspectorsService.remove(+id);
  }
}
