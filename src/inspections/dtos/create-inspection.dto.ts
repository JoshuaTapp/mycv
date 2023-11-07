import {
  IsInt,
  IsDateString,
  IsOptional,
  IsArray,
  ArrayMinSize,
  IsString,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ChecklistItemDto {
  @IsString()
  item: string;

  @IsString()
  status: 'pass' | 'fail';

  @IsOptional()
  @IsString()
  explanation?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  picturesUrls?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  videosUrls?: string[];
}

export class CreateInspectionDto {
  @IsInt()
  inspectorID: number;

  @IsDateString()
  dateTime: Date;

  @IsInt()
  homeId: number;

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
