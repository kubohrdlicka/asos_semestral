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
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class UserGroup extends BaseEntity {
  @ManyToOne(() => User, (user) => user.userGroups)
  owner: User;

  @ManyToMany(() => User, (user) => user.memberOf)
  @JoinTable()
  members: User[];

  @OneToMany(() => Entry, (entry) => entry.userGroup)
  entries: Entry[];

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  color: string;

  @Column({ nullable: true })
  iconName?: string;

  @Column({ type: 'varchar' })
  inviteCode: string;

  @BeforeInsert()
  generateUuid() {
    this.inviteCode = uuidv4();
  }
}
