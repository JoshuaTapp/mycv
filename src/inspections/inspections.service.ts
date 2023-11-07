import { Injectable } from '@nestjs/common';
import { CreateInspectionDto } from './dtos/create-inspection.dto';
import { UpdateInspectionDto } from './dtos/update-inspection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inspection } from './entities/inspection.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InspectionsService {
  constructor(
    @InjectRepository(Inspection)
    private inspectionRepo: Repository<Inspection>,
  ) {}

  async create(createInspectionDto: CreateInspectionDto): Promise<Inspection> {
    const inspection = this.inspectionRepo.create(createInspectionDto);
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
