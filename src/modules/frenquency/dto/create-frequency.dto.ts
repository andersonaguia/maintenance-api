import { IsEnum, ValidationArguments } from 'class-validator';
import { Frequency } from '../enum/frequency.enum';

export class CreateFrequencyDto {
  @IsEnum(Frequency, {
    message: (args: ValidationArguments) => {
      const validValues = Object.values(Frequency).join(', ');
      return `Insira um tipo válido. Os valores aceitos são: ${validValues}`;
    },
  })
  readonly type?: Frequency;
}
