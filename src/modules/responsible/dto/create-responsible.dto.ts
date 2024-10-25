import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateResponsibleDto {
  @IsNotEmpty({ message: 'Obrigatório preencher o nome da empresa' })
  @IsString({ message: 'Nome da empresa precisa ser uma string' })
  readonly company: string;

  @IsNotEmpty({ message: 'Obrigatório preencher o número do telefone' })
  @IsString({ message: 'Número do telefone precisa ser uma string' })
  readonly phoneNumber: string;

  @IsNotEmpty({ message: 'Obrigatório preencher o e-mail' })
  @IsEmail(
    {},
    {
      message: 'Insira um e-mail válido',
    },
  )
  readonly email: string;

  @IsNotEmpty({ message: 'Obrigatório preencher o nome do contato' })
  @IsString({ message: 'Nome do contato precisa ser uma string' })
  readonly contact: string;
}
