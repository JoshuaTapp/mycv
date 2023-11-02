import {
  IsString,
  IsOptional,
  IsEmail,
  IsInt,
  IsArray,
  ArrayMinSize,
  IsNumber,
} from 'class-validator';
import { District } from 'src/districts/district.entity';

export class CreateInspectorDto {
  @IsNumber()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsInt()
  fireLevel: number;

  @IsOptional()
  @IsInt()
  structuralLevel: number;

  @IsOptional()
  @IsInt()
  plumbingLevel: number;

  @IsOptional()
  @IsInt()
  electricalLevel: number;

  @IsArray()
  @ArrayMinSize(1)
  districts: District[];
}
