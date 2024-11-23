import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import BaseEntity from 'src/common/entities/base.entity';
import { UserGroup } from '../../usergroup/entities/usergroup.entity';

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum Status {
  TODO = 'TODO',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

export enum Type {
  NOTE = 'note',
  TASK = 'task',
}

@Entity()
export class Entry extends BaseEntity {
  @ManyToOne(() => User, (user) => user.entries)
  owner: User;

  @ManyToOne(() => UserGroup, (userGroup) => userGroup.entries, {
    nullable: true,
  })
  userGroup: UserGroup;

  @ManyToOne(() => Tag, (tag) => tag.entries, { nullable: true })
  tag: Tag;

  @Column({ type: 'enum', enum: Priority })
  priority: Priority;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @Column({ type: 'enum', enum: Type, nullable: true })
  type: Type;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  deadline?: Date;

  @Column({ nullable: true })
  color?: string;

  @Column({ nullable: true })
  iconName?: string;
}
