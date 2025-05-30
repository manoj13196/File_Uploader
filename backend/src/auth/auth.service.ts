import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from "./dto/register_user.dto";

@Injectable()

export class AuthService{
    constructor(private readonly usersService:UsersService){}


    async validateUser(email:string, password:string){

        const user = await this.usersService.findByEmail(email);
        if(!user){
            throw new UnauthorizedException('User Not found');
        }

        const isMatch= await bcrypt.compare(password, user.password);

        if(!isMatch){
            throw new UnauthorizedException('Invalid Password');
        }

        return user;
    }

    async register(dto: RegisterUserDto){
        const existing = await this.usersService.findByEmail(dto.email);

        if(existing){
            throw new BadRequestException(`Email already registered`);
        }

        const user =await this.usersService.createUser(dto);

        const {password, ...safeUser}=user;
        return {message : 'Registered successfully', user: safeUser}
    }
}