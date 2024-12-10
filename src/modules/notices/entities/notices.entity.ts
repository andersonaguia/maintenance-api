import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { PreventiveEntity } from 'src/modules/preventive/entities/preventive.entity';
import { CorrectiveEntity } from 'src/modules/corrective/entities/corrective.entity';

@Entity({ name: 'notices' })
export class NoticesEntity extends BaseEntity {
  @ManyToOne(() => PreventiveEntity, { nullable: true })
  @JoinColumn({ name: 'preventiveId' })
  preventiveId: PreventiveEntity;

  @ManyToOne(() => CorrectiveEntity, { nullable: true })
  @JoinColumn({ name: 'correctiveId' })
  correctiveId: CorrectiveEntity;

  @Column({ nullable: false })
  sendingDate: Date;

  @Column({ nullable: false })
  wasSent: boolean;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'createdBy' })
  user: UserEntity;
}
