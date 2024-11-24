import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePreventiveHistoryDto {
  @IsOptional()
  @IsString({message: 'Campo comentário deve ser uma string'})
  readonly comments?: string;

  @IsNotEmpty({message: 'Obrigatório informar o ID da manutenção'})
  @IsNumber({},{message: 'ID da manutenção deve ser um número'})
  readonly preventiveId: number;

  @IsNotEmpty({message: 'Obrigatório informar o status da manutenção'})
  @IsNumber({},{message: 'Status da manutenção deve ser um número'})
  readonly currentStatusId: number;
}
