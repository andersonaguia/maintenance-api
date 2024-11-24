import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Entity({ name: 'frequency' })
export class FrequencyEntity extends BaseEntity {
  @Column({
    length: 100,
    nullable: false,
    unique: true,
  })
  name: string;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'createdBy' })
  user: UserEntity;
}
