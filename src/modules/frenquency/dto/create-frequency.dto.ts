import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFrequencyDto {
  @IsNotEmpty({ message: 'Obrigatório inserir o campo name' })
  @IsString({ message: 'Campo name deve ser do tipo string' })
  readonly name: string;
}
