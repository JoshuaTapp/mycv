import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { InspectionsService } from './inspections.service';
import { CreateInspectionDto } from './dtos/create-inspection.dto';
import { UpdateInspectionDto } from './dtos/update-inspection.dto';
import { Inspection } from './entities/inspection.entity';

@Controller('inspections')
export class InspectionsController {
  constructor(private readonly inspectionsService: InspectionsService) {}

  @Post()
  create(
    @Body() createInspectionDto: CreateInspectionDto,
  ): Promise<Inspection> {
    return this.inspectionsService.create(createInspectionDto);
  }

  @Get()
  findAll(): Promise<Inspection[]> {
    return this.inspectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Inspection> {
    return this.inspectionsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateInspectionDto: UpdateInspectionDto,
  ): Promise<Inspection> {
    return this.inspectionsService.update(+id, updateInspectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Inspection> {
    return this.inspectionsService.remove(+id);
  }
}
