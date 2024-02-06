import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  image: string;

  @Column('simple-array')
  roles: string[];

  @Column('simple-array')
  permissions: string[];
}
