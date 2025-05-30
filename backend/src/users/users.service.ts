import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create_user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(User)
        private readonly userRepo:Repository<User>,
    ){}


async createUser(createUserDto:CreateUserDto):Promise<User>{
    const hashed=await bcrypt.hash(createUserDto.password, 10);
    const user=this.userRepo.create({
        email: createUserDto.email,
        password: hashed,
    });
    return this.userRepo.save(user);
}

async findByEmail(email:string): Promise<User|null>{
    return this.userRepo.findOne({where:{email}});
}

async findById(id:string): Promise<User|null>{
    return this.userRepo.findOne({where:{id}});
}

}