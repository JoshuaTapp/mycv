import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Home } from '../../homes/entities/home.entity';

@Entity()
export class Inspection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inspectorID: number;

  @Column()
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
  home: Home;
}
