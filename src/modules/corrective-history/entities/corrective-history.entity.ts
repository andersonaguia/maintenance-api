import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { CurrentStatusEntity } from 'src/modules/current-status/entities/current-status.entity';
import { CorrectiveEntity } from 'src/modules/corrective/entities/corrective.entity';

@Entity({ name: 'corrective_history' })
export class CorrectiveHistoryEntity extends BaseEntity {
  @Column({ nullable: true, length: 500 })
  comments: string;

  @ManyToOne(() => CorrectiveEntity, { nullable: false })
  @JoinColumn({ name: 'correctiveId' })
  correctiveId: CorrectiveEntity;

  @ManyToOne(() => CurrentStatusEntity, { nullable: false })
  @JoinColumn({ name: 'currentStatus' })
  currentStatus: CurrentStatusEntity;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'createdBy' })
  user: UserEntity;
}
