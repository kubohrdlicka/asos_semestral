import BaseEntity from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Helloworld extends BaseEntity {
  @Column()
  name: string;
}
