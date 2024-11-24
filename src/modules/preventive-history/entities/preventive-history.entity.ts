import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { CurrentStatusEntity } from 'src/modules/current-status/entities/current-status.entity';
import { PreventiveEntity } from 'src/modules/preventive/entities/preventive.entity';

@Entity({ name: 'preventive_history' })
export class PreventiveHistoryEntity extends BaseEntity {
  @Column({ nullable: true, length: 500 })
  comments: string;

  @ManyToOne(() => PreventiveEntity, { nullable: false })
  @JoinColumn({ name: 'preventiveId' })
  preventiveId: PreventiveEntity;

  @ManyToOne(() => CurrentStatusEntity, { nullable: false })
  @JoinColumn({ name: 'currentStatus' })
  currentStatus: CurrentStatusEntity;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'createdBy' })
  user: UserEntity;
}
