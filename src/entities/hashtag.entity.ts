import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('HASHTAGS', { schema: 'velog' })
export class Hashtags {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name' })
  name: string;
}
