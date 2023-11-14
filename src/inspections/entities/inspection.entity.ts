import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Home } from '../../homes/entities/home.entity';
import { Inspector } from '../../inspectors/entities/inspector.entity';

@Entity()
export class Inspection {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  dateTime: Date;

  @Column({ type: 'json', nullable: true })
  fireChecklist: {
    item: string;
    status: 'pass' | 'fail';
    explanation: string;
    picturesUrls: string[];
    videosUrls: string[];
  }[];

  @Column({ type: 'json', nullable: true })
  structuralChecklist: {
    item: string;
    status: 'pass' | 'fail';
    explanation: string;
    picturesUrls: string[];
    videosUrls: string[];
  }[];

  @Column({ type: 'json', nullable: true })
  plumbingChecklist: {
    item: string;
    status: 'pass' | 'fail';
    explanation: string;
    picturesUrls: string[];
    videosUrls: string[];
  }[];

  @Column({ type: 'json', nullable: true })
  electricalChecklist: {
    item: string;
    status: 'pass' | 'fail';
    explanation: string;
    picturesUrls: string[];
    videosUrls: string[];
  }[];

  @ManyToOne(() => Home, (home) => home.inspections)
  @JoinColumn({ name: 'homeId', referencedColumnName: 'id' })
  home: Home;

  @ManyToOne(() => Inspector, (inspector) => inspector.inspections)
  inspector: Inspector;
}
