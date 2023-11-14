import { Expose, Transform } from 'class-transformer';
import { User } from '../../users/user.entity';

export class InspectorDto {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  fireLevel: number;

  @Expose()
  structuralLevel: number;

  @Expose()
  plumbingLevel: number;

  @Expose()
  electricalLevel: number;

  @Expose()
  userId: User;
}
