
import { IsEmail, IsString, MinLength } from 'class-validator';
export class CreateUserDto{
    static password(password: any, arg1: number) {
        throw new Error("Method not implemented.");
    }
    @IsEmail()
    email:string;

    @IsString()
    @MinLength(6)
    password:string;
}