import BaseEntity from 'src/common/entities/base.entity';
import { Entry } from 'src/entry/entities/entry.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  OneToMany,
  JoinTable,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity()
export class UserGroup extends BaseEntity {
  @ManyToOne(() => User, (user) => user.userGroups)
  owner: User;

  @ManyToMany(() => User, (user) => user.id)
  @JoinTable()
  members: User[];

  @OneToMany(() => Entry, (entry) => entry.id)
  @JoinTable()
  entries: Entry[];

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  color: string;

  @Column({ nullable: true })
  iconName?: string;
}
