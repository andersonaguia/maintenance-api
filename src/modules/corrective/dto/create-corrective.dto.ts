import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCorrectiveDto {
  @IsString({ message: 'Descrição deve ser um texto' })
  @IsNotEmpty({ message: 'Obrigatório informar a descrição do serviço' })
  readonly description: string;

  @IsNumber({}, { message: 'ID da categoria deve ser um número' })
  @IsNotEmpty({ message: 'Obrigatório informar o id da categoria' })
  readonly categoryId: number;

  @IsNumber({}, { message: 'ID do responsável deve ser um número' })
  @IsNotEmpty({ message: 'Obrigatório informar o id do responsável' })
  readonly responsibleId: number;

  @IsDateString(
    {},
    { message: 'Campo data do serviço deve ser uma data válida' },
  )
  @IsNotEmpty({
    message: 'Obrigatório informar a data para realização da manutenção',
  })
  readonly next: string;

  @IsBoolean({ message: 'Campo enviar alerta deve ser um booleano' })
  @IsNotEmpty({ message: 'Obrigatório informar se deve ser enviado alerta' })
  readonly sendNotice: boolean;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'Campo data do alerta deve ser uma data válida' },
  )
  readonly noticeDate?: string;

  @IsNumber({}, { message: 'Campo status deve ser um número' })
  @IsNotEmpty({ message: 'Obrigatório informar o id do status' })
  readonly currentStatus: number;
}
