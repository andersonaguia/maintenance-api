import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCurrentStatusDto {
  @IsString({ message: 'Status deve ser uma string!' })
  @IsNotEmpty({message: 'Obrigatório informar o status'})
  name: string;
}
