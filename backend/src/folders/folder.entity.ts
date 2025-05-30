import { User } from "src/users/user.entity";
import { File } from 'src/files/file.entity';

import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Folders')

export class Folder{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @ManyToOne(()=> User, (user)=>user.folders, {onDelete:'CASCADE'})
    user:User;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @OneToMany(() => File, (file) => file.folder)
files: File[];

}