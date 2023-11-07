import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeDto } from './create-home.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateHomeDto extends PartialType(CreateHomeDto) {
  @IsOptional()
  @IsString()
  addressField1?: string;

  @IsOptional()
  @IsString()
  addressField2?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zip?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  inspectors?: string[];
}
