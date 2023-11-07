import { PartialType } from '@nestjs/mapped-types';
import { CreateInspectorDto } from './create-inspector.dto';
import { IsEmail, IsString, IsOptional } from 'class-validator';

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
