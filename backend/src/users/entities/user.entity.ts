import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { IsEmail } from 'class-validator';
import BaseEntity from '../../common/entities/base.entity';
import { Entry } from '../../entry/entities/entry.entity';
import { UserGroup } from '../../usergroup/entities/usergroup.entity';
import * as argon2 from 'argon2';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true, nullable: false })
  @IsEmail()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    try {
      this.password = await argon2.hash(this.password);
    } catch (err) {
      console.error(err);
    }
  }

  @OneToMany(() => Entry, (entry) => entry.owner)
  entries: Entry[];

  @OneToMany(() => UserGroup, (userGroup) => userGroup.owner)
  userGroups: UserGroup[];

  @ManyToMany(() => UserGroup, (userGroup) => userGroup.members)
  memberOf: UserGroup[];
}
