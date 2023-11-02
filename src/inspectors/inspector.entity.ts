import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { District } from '../districts/district.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Inspector {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'int', nullable: true })
  fireLevel: number;

  @Column({ type: 'int', nullable: true })
  structuralLevel: number;

  @Column({ type: 'int', nullable: true })
  plumbingLevel: number;

  @Column({ type: 'int', nullable: true })
  electricalLevel: number;

  @ManyToMany(() => District, (district) => district.inspectors)
  districts: District[];

  @OneToOne(() => User)
  user: User;
}
