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
import {
  ChecklistItemDto,
  CreateInspectionDto,
} from './dtos/create-inspection.dto';
import { UpdateInspectionDto } from './dtos/update-inspection.dto';
import { Inspection } from './entities/inspection.entity';
import { generateInspections } from '../../utils/generateData';

@Controller('inspections')
export class InspectionsController {
  constructor(private readonly inspectionsService: InspectionsService) {}

  @Post('/create-inspection')
  create(
    @Body() createInspectionDto: CreateInspectionDto,
  ): Promise<Inspection> {
    return this.inspectionsService.create(createInspectionDto);
  }

  @Get()
  findAll(): Promise<Inspection[]> {
    return this.inspectionsService.findAll();
  }

  @Get('/get-inspections-table')
  async getInspectionsTable() {
    return this.inspectionsService.findAllCreateTable();
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

  // @Get('/generate/:numInspections')
  // async generateRandomInspections(
  //   @Param('numInspections') numInspections: number,
  // ) {
  //   const inspections = await generateInspections(numInspections);
  //   const promises = inspections.map(async (inspection) => {
  //     const createInspectionDto = new CreateInspectionDto();
  //     createInspectionDto.inspectorId = inspection.inspectorId;
  //     createInspectionDto.homeId = inspection.homeId;
  //     createInspectionDto.fireChecklist = [];
  //     createInspectionDto.structuralChecklist = [];
  //     createInspectionDto.plumbingChecklist = [];
  //     createInspectionDto.electricalChecklist = [];

  //     if (inspection.fireChecklist) {
  //       inspection.fireChecklist.forEach((item) => {
  //         const checklistItem = new ChecklistItemDto();
  //         checklistItem.item = item.item;
  //         checklistItem.status = item.status === 'pass' ? 'pass' : 'fail';
  //         checklistItem.explanation = item.explanation;
  //         checklistItem.picturesUrls = item.picturesUrls;
  //         checklistItem.videosUrls = item.videosUrls;
  //         createInspectionDto.fireChecklist.push(checklistItem);
  //       });
  //     }
  //     if (inspection.structuralChecklist) {
  //       inspection.structuralChecklist.forEach((item) => {
  //         const checklistItem = new ChecklistItemDto();
  //         checklistItem.item = item.item;
  //         checklistItem.status = item.status === 'pass' ? 'pass' : 'fail';
  //         checklistItem.explanation = item.explanation;
  //         checklistItem.picturesUrls = item.picturesUrls;
  //         checklistItem.videosUrls = item.videosUrls;
  //         createInspectionDto.structuralChecklist.push(checklistItem);
  //       });
  //     }
  //     if (inspection.plumbingChecklist) {
  //       inspection.plumbingChecklist.forEach((item) => {
  //         const checklistItem = new ChecklistItemDto();
  //         checklistItem.item = item.item;
  //         checklistItem.status = item.status === 'pass' ? 'pass' : 'fail';
  //         checklistItem.explanation = item.explanation;
  //         checklistItem.picturesUrls = item.picturesUrls;
  //         checklistItem.videosUrls = item.videosUrls;
  //         createInspectionDto.plumbingChecklist.push(checklistItem);
  //       });
  //     }
  //     if (inspection.electricalChecklist) {
  //       inspection.electricalChecklist.forEach((item) => {
  //         const checklistItem = new ChecklistItemDto();
  //         checklistItem.item = item.item;
  //         checklistItem.status = item.status === 'pass' ? 'pass' : 'fail';
  //         checklistItem.explanation = item.explanation;
  //         checklistItem.picturesUrls = item.picturesUrls;
  //         checklistItem.videosUrls = item.videosUrls;
  //         createInspectionDto.electricalChecklist.push(checklistItem);
  //       });
  //     }

  //     return this.inspectionsService.create(createInspectionDto);
  //   });
  // }
}
