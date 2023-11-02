import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Column,
} from 'typeorm';
import { Inspector } from '../inspectors/inspector.entity';

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Inspector, (inspector) => inspector.districts)
  @JoinTable()
  inspectors: Inspector[];

  // Add other fields as necessary
}
