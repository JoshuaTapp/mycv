import { PartialType } from '@nestjs/mapped-types';
import { CreateInspectorDto } from './create-inspector.dto';
import { IsEmail, IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateInspectorDto extends PartialType(CreateInspectorDto) {
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
}
