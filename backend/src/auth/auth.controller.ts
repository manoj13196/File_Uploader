import { Body, Controller, Get, Post,Request,UnauthorizedException,UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RegisterUserDto } from "./dto/register_user.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService:AuthService){}

    @Post('register')
    register(@Body() dto:RegisterUserDto){
        return this.authService.register(dto);
    }

   @UseGuards(AuthGuard('local'))
@Post('login')
login(@Request() req) {
  return new Promise((resolve, reject) => {
    req.login(req.user, (err) => {
      if (err) return reject(err);
      resolve({ message: 'Login successful', user: req.user });
    });
  });
}

   @UseGuards(AuthGuard('session'))
  @Get('me')
  getme(@Request() req) {
    if (!req.user) {
      throw new UnauthorizedException('User not logged in');
    }

    const { password, ...safeUser } = req.user;
    return safeUser;
  }
    @Post('logout')
    logout(@Request() req){
        req.session.destroy();
        return {success:true}
    }


}