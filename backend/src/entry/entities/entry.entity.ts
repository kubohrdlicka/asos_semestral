import BaseEntity from 'src/common/entities/base.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

enum Type {
  NOTE = 'note',
  TASK = 'task',
}
@Entity()
export class Entry extends BaseEntity {
  @OneToMany(() => User, (user) => user.entries)
  owner: User;

  @Column({ type: 'enum', enum: Type })
  type: string;

  @Column()
  name: string;

  @ManyToOne(() => Tag, (tag) => tag.entries, { nullable: true })
  tag: Tag;

  @Column()
  priority: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  deadline?: Date;

  @Column()
  status: 'Done' | 'InProgress';

  @Column({ nullable: true })
  color?: string;

  @Column({ nullable: true })
  iconName?: string;
}
