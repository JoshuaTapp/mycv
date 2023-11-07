import {
  IsString,
  IsOptional,
  IsEmail,
  IsInt,
  IsArray,
  ArrayMinSize,
  IsNumber,
} from 'class-validator';

export class CreateInspectorDto {
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
}
