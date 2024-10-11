import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'Categoria deve ser uma string!' })
  name: string;
}
