import { Injectable } from '@nestjs/common';
import { CreateInspectionDto } from './dtos/create-inspection.dto';
import { UpdateInspectionDto } from './dtos/update-inspection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inspection } from './entities/inspection.entity';
import { Repository } from 'typeorm';
import { HomesService } from '../homes/homes.service';
import { InspectorsService } from '../inspectors/inspectors.service';

@Injectable()
export class InspectionsService {
  constructor(
    @InjectRepository(Inspection)
    private inspectionRepo: Repository<Inspection>,
    private readonly homesService: HomesService,
    private readonly inspectorService: InspectorsService,
  ) {}

  async create(createInspectionDto: CreateInspectionDto): Promise<Inspection> {
    const inspection = this.inspectionRepo.create(createInspectionDto);

    inspection.home = await this.homesService.findOne(
      createInspectionDto.homeId,
    );

    inspection.inspector = await this.inspectorService.findOne(
      createInspectionDto.inspectorId,
    );

    // ToDo: handle the case where the home or inspector is not found

    return this.inspectionRepo.save(inspection);
  }

  findOne(id: number): Promise<Inspection> {
    if (!id) {
      return null;
    }
    return this.inspectionRepo.findOneBy({ id });
  }
  findAll(): Promise<Inspection[]> {
    return this.inspectionRepo.find();
  }

  async findAllCreateTable() {
    const inspections = await this.inspectionRepo.find({
      relations: ['home', 'inspector'],
    });

    return inspections.map((inspection) => {
      let inspectionType: string[] = [];
      if (inspection.fireChecklist && inspection.fireChecklist.length > 0) {
        inspectionType.push('Fire');
      }
      if (
        inspection.structuralChecklist &&
        inspection.structuralChecklist.length > 0
      ) {
        inspectionType.push('Structural');
      }
      if (
        inspection.plumbingChecklist &&
        inspection.plumbingChecklist.length > 0
      ) {
        inspectionType.push('Plumbing');
      }
      if (
        inspection.electricalChecklist &&
        inspection.electricalChecklist.length > 0
      ) {
        inspectionType.push('Electrical');
      }

      return {
        inspectorName: `${inspection.inspector.firstName} ${inspection.inspector.lastName}`,
        dateTime: inspection.dateTime,
        home: inspection.home.id,
        zipCode: inspection.home.zip,
        inspection: inspection.id,
        inspectionType: inspectionType.join(', '),
      };
    });
  }

  async update(
    id: number,
    updateInspectionDto: UpdateInspectionDto,
  ): Promise<Inspection> {
    const inspection = await this.inspectionRepo.findOneBy({ id });

    if (!inspection) {
      return null;
    }

    const updatedInspection = {
      ...inspection,
      ...updateInspectionDto,
    };

    return this.inspectionRepo.save(updatedInspection);
  }
  async remove(id: number): Promise<Inspection> {
    const inspection = await this.inspectionRepo.findOneBy({ id });

    if (!inspection) {
      return null;
    }

    return this.inspectionRepo.remove(inspection);
  }
}
