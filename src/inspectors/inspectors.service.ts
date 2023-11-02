import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inspector } from './inspector.entity';

@Injectable()
export class InspectorsService {
  constructor(
    @InjectRepository(Inspector)
    private inspectorsRepository: Repository<Inspector>,
  ) {}

  // create a new inspector
  create(inspector: Inspector): Promise<Inspector> {
    return this.inspectorsRepository.save(inspector);
  }

  findAll(): Promise<Inspector[]> {
    return this.inspectorsRepository.find();
  }

  findOne(id: number): Promise<Inspector> {
    if (!id) {
      return null;
    }
    return this.inspectorsRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<Inspector> {
    if (!email) {
      return null;
    }

    return this.inspectorsRepository.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    const inspector = await this.findOne(id);
    if (!inspector) {
      throw new NotFoundException('inspector not found');
    }

    await this.inspectorsRepository.delete(id);
  }

  async update(id: number, inspector: Partial<Inspector>): Promise<Inspector> {
    const inspectorToUpdate = await this.findOne(id);
    if (!inspectorToUpdate) {
      throw new NotFoundException('inspector not found');
    }
    Object.assign(inspectorToUpdate, inspector);
    return this.inspectorsRepository.save(inspectorToUpdate);
  }
}
