import BaseEntity from '../../common/entities/base.entity';
import { Entry } from '../../entry/entities/entry.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Tag extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  color: string;

  @Column({ nullable: true })
  iconName?: string;

  @OneToMany(() => Entry, (entry) => entry.tag, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  entries: Entry[];
}
