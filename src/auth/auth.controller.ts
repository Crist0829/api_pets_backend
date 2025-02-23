import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('connect')
export class AuthController {

    constructor( private authService : AuthService ){}

    @Post('/register')
    async register(@Body(new ValidationPipe()) createUserDto : CreateUserDto, @Res() res : Response ){
        const response = await this.authService.register(createUserDto)
        return res.status(response.status!).json(response)

    }

    @Post('/token')
    async login (@Body(new ValidationPipe()) loginDto : LoginDto, @Res() res : Response  ) {

        const response = await this.authService.login(loginDto)

        return res.status(response.status!).json(response)
    }


}  
