import { Folder } from "src/folders/folder.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('files')
export class File{
    @PrimaryGeneratedColumn()
    id:number;

      @Column()
  filename: string;



  //   @Column()
  // path: string;


  @Column({ nullable: true })
cloudinaryPublicId: string;


    @Column()
  mimetype: string;

    @Column()
  size: number;

    @ManyToOne(() => Folder, (folder) => folder.files, { onDelete: 'CASCADE' })
  folder: Folder;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
cloudinaryUrl: string;

}