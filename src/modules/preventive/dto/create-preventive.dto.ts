import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { InstanceChecker } from "typeorm";

export class CreatePreventiveDto {
    @IsString({message: 'Descrição deve ser um texto'})
    @IsNotEmpty({message: 'Obrigatório informar a descrição do serviço'})
    readonly description: string;

    @IsNumber({}, {message: 'ID da categoria deve ser um número'})
    @IsNotEmpty({message: 'Obrigatório informar o id da categoria'})
    readonly categoryId: number;

    @IsNumber({}, {message: 'ID da periodicidade deve ser um número'})
    @IsNotEmpty({message: 'Obrigatório informar o id da periodicidade'})
    readonly frequencyId: number;

    @IsNumber({}, {message: 'ID do responsável deve ser um número'})
    @IsNotEmpty({message: 'Obrigatório informar o id do responsável'})
    readonly responsibleId: number;

    @IsDateString({}, {message: 'Campo data do serviço deve ser uma data válida'})
    @IsNotEmpty({message: 'Obrigatório informar a data para realização da manutenção'})
    readonly serviceDate: Date;

    @IsBoolean({message: 'Campo enviar alerta deve ser um booleano'})
    @IsNotEmpty({message: 'Obrigatório informar se deve ser enviado alerta'})
    readonly sendNotice: boolean;

    @IsDateString({}, {message: 'Campo data do envio deve ser uma data válida'})
    @IsNotEmpty({message: 'Obrigatório informar a data para envio de alertas'})
    readonly noticeDate: Date;
}