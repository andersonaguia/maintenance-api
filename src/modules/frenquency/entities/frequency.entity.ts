import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Frequency } from '../enum/frequency.enum';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Entity({ name: 'frequency' })
export class FrequencyEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: Frequency,
    default: Frequency.SIX_MONTHS,
    nullable: false,
    unique: true,
  })
  type: Frequency;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'createdBy' })
  user: UserEntity;
}
