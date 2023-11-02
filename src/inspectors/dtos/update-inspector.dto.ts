import { CreateInspectorDto } from './create-inspector.dto';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateInspectorDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  fireLevel: number;

  @IsOptional()
  @IsString()
  structuralLevel: number;

  @IsOptional()
  @IsString()
  plumbingLevel: number;

  @IsOptional()
  @IsString()
  electricalLevel: number;
}
