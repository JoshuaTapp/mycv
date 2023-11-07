import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateHomeDto } from './dto/update-home.dto';
import { Home } from './entities/home.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHomeDto } from './dto/create-home.dto';

@Injectable()
export class HomesService {
  constructor(@InjectRepository(Home) private homeRepo: Repository<Home>) {}

  create(createHomeDto: CreateHomeDto): Promise<Home> {
    const home = this.homeRepo.create(createHomeDto);
    return this.homeRepo.save(home);
  }

  findAll(): Promise<Home[]> {
    return this.homeRepo.find();
  }

  findOne(id: number): Promise<Home> {
    if (!id) {
      return null;
    }

    return this.homeRepo.findOneBy({ id });
  }

  findByZip(zip: string): Promise<Home[]> {
    return this.homeRepo.find({ where: { zip } });
  }

  async update(id: number, updateHomeDto: UpdateHomeDto): Promise<Home> {
    const home = await this.findOne(id);
    if (!home) {
      throw new NotFoundException('home not found');
    }

    Object.assign(home, updateHomeDto);
    return this.homeRepo.save(home);
  }

  async remove(id: number): Promise<Home> {
    const home = await this.findOne(id);
    if (!home) {
      throw new NotFoundException('home not found');
    }
    return this.homeRepo.remove(home);
  }
}
