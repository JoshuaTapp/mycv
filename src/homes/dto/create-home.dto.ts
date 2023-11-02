import { IsString } from 'class-validator';

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
  zip: string;
}
