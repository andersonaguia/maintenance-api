import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'Categoria deve ser uma string!' })
  @IsNotEmpty({message: 'Obrigatório informar a categoria'})
  name: string;
}
