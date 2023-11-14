import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateHomeDto {
  @IsString()
  addressField1: string;

  @IsString()
  addressField2: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  @MinLength(5, { message: 'zip is too short' })
  @MaxLength(5, { message: 'zip is too long' })
  zip: string;

  // todo: init as empty array
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  inspectors: string[];
}
