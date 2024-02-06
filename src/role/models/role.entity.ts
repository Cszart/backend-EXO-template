import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  role: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modifiedAt: Date;

  // -- -- Relations -- -- //

  // @ManyToMany(() => CategoriesEntity, category => category.notes)
  // @JoinTable({
  //   name: 'notes_categories',
  //   joinColumn: {
  //     name: 'note_id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'categories_id',
  //   },
  // })
  // categories: CategoriesEntity[];
}
