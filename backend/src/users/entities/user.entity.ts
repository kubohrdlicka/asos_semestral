import { BeforeInsert, Column, Entity } from 'typeorm';

import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
import BaseEntity from 'src/common/entities/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  @IsEmail()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const salt: string = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
