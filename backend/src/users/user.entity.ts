/* eslint-disable prettier/prettier */
import { Folder } from "src/folders/folder.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @CreateDateColumn()
    createdAt:Date;

    @OneToMany(() => Folder, (folders) => folders.user)
folders: Folder[];
}