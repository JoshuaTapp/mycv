import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Inspection } from '../../inspections/entities/inspection.entity';

@Entity()
export class Home {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  addressField1: string;

  @Column()
  addressField2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @OneToMany(() => Inspection, (inspection) => inspection.home)
  inspections: Inspection[];
}
