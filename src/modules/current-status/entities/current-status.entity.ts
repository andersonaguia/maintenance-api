import { BaseEntity } from 'src/core/entities/base.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'current_status' })
export class CurrentStatusEntity extends BaseEntity {
  @Column({ nullable: false, length: 150, unique: true })
  name: string;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'createdBy' })
  user: UserEntity;
}
