import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inspector } from './entities/inspector.entity';
import { CreateInspectorDto } from './dtos/create-inspector.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class InspectorsService {
  @Inject(UsersService)
  private readonly usersService: UsersService;

  constructor(
    @InjectRepository(Inspector)
    private inspectorsRepository: Repository<Inspector>,
  ) {}

  async create(createInspectorDto: CreateInspectorDto): Promise<Inspector> {
    // if first or last name are not provided, throw an error
    if (!createInspectorDto.firstName || !createInspectorDto.lastName) {
      throw new BadRequestException('First and last name are required');
    }

    const user = await this.usersService.findOneByEmail(
      createInspectorDto.email,
    );

    // TODO: create a new user with the email provided if it doesn't exist
    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }
    console.log('before create inspector');
    const inspector = this.inspectorsRepository.create(createInspectorDto);
    console.log('after create inspector');
    inspector.user = user;
    console.log('after inspector.user = user');
    const obj = this.inspectorsRepository.save(inspector);
    console.log('after save');
    return obj;
  }

  findAll(): Promise<Inspector[]> {
    return this.inspectorsRepository.find();
  }

  findOne(id: number): Promise<Inspector> {
    if (!id) {
      return null;
    }
    console.log('id', id);
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
