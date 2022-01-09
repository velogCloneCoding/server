import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('HASHTAG', { schema: 'velog' })
export class Hashtag {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name' })
  name: string;
}
