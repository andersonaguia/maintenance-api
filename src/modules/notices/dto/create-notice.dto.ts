import { CorrectiveEntity } from "src/modules/corrective/entities/corrective.entity";
import { PreventiveEntity } from "src/modules/preventive/entities/preventive.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";

export class CreateNoticeDto {
  readonly preventiveId: PreventiveEntity | null;
  readonly correctiveId: CorrectiveEntity | null;
  readonly sendingDate: Date;
  readonly user: UserEntity | null;
}
