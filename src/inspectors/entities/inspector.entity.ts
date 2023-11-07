import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
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

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ type: 'int', nullable: true })
  fireLevel: number;

  @Column({ type: 'int', nullable: true })
  structuralLevel: number;

  @Column({ type: 'int', nullable: true })
  plumbingLevel: number;

  @Column({ type: 'int', nullable: true })
  electricalLevel: number;

  @OneToOne(() => User, (user) => user.inspector)
  @JoinColumn()
  user: User;
}
