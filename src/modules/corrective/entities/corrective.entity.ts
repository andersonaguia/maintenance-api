import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { ResponsibleEntity } from 'src/modules/responsible/entities/responsible.entity';
import { CurrentStatusEntity } from 'src/modules/current-status/entities/current-status.entity';

@Entity({ name: 'corrective' })
export class CorrectiveEntity extends BaseEntity {
  @Column({ nullable: false, length: 500 })
  description: string;

  @ManyToOne(() => CategoryEntity, { nullable: false })
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @ManyToOne(() => ResponsibleEntity, { nullable: false })
  @JoinColumn({ name: 'responsibleId' })
  responsible: ResponsibleEntity;

  @Column({ nullable: false })
  next: Date;

  @Column({ nullable: false })
  sendNotice: boolean;

  @ManyToOne(() => CurrentStatusEntity, { nullable: false })
  @JoinColumn({ name: 'currentStatus' })
  currentStatus: CurrentStatusEntity;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'createdBy' })
  user: UserEntity;

  @Column({ nullable: true })
  noticeDate: Date;
}
