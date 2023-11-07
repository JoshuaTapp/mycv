import { PartialType } from '@nestjs/mapped-types';
import {
  IsOptional,
  IsDateString,
  IsInt,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateInspectionDto, ChecklistItemDto } from './create-inspection.dto';
import { Type } from 'class-transformer';

export class UpdateInspectionDto extends PartialType(CreateInspectionDto) {
  @IsOptional()
  @IsDateString()
  dateTime?: Date;

  @IsOptional()
  @IsInt()
  homeId?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChecklistItemDto)
  fireChecklist?: ChecklistItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChecklistItemDto)
  structuralChecklist?: ChecklistItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChecklistItemDto)
  plumbingChecklist?: ChecklistItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChecklistItemDto)
  electricalChecklist?: ChecklistItemDto[];
}
