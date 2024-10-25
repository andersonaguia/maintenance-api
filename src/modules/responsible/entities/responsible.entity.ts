import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Entity({ name: 'responsible' })
export class ResponsibleEntity extends BaseEntity {
  @Column({nullable: false, length: 150, unique: true})
  company: string;

  @Column({length: 15, unique: true})
  phoneNumber: string;

  @Column({length: 150, unique: true})
  email: string;

  @Column({length: 50, unique: true})
  contact: string;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'createdBy' })
  user: UserEntity;
}
