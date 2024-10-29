import { IsOptional, IsString, IsEnum, Min, IsNumber, IsNotEmpty } from 'class-validator'
import { PetsType } from '../entities/enums'

export class UploadImageDto {

  @IsOptional()
  name: string

  @IsOptional()
  @IsString()
  petId?: string  | null

}
