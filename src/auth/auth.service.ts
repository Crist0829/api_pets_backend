import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwtService: JwtService
  ) {}

  async login(loginDto : LoginDto){

    let user = await this.userRepository.findOne({ where: { email: loginDto.username } });

    if (!user) {

      return {
        status : 400,
        "error" : "No existe un usuario con ese email"
      }
    }

    const result = await bcrypt.compare(loginDto.password, user.password)

    if(!result){
        return {
            status : 400,
            error : 'Contraseña incorrecta'
        }
    }

    const payload = { id: user.id, username : user.email };
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret : process.env.JWT_REFRESH_SECRET, 
      expiresIn : '30d'
    })

    return {
        status : 200,
        id : user.id,
        name : user.name,
        email : user.email,
        access_token : await this.jwtService.signAsync(payload),
        refresh_token
    }
    
  }


  async register( createUserDto : CreateUserDto ) {

    let user = await this.userRepository.findOne({ where: { email: createUserDto.email } });

    if(user){
        return {
            status : 400,
            error : 'Ya existe un usuario con ese email'
        }
    }

    let payload = { id : 0, username : createUserDto.email };

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret : process.env.JWT_REFRESH_SECRET, 
      expiresIn : '30d'
    })

    const userData = {
        name : createUserDto.name, 
        email : createUserDto.email, 
        password : await bcrypt.hash(createUserDto.password, 10),
        refresh_token
    }

    user =  await this.userRepository.save(userData)

    payload = { id: user.id, username : user.email };

    return {
        status : 200,
        name : createUserDto.name,
        email : createUserDto.email,
        access_token : await this.jwtService.signAsync(payload)
    }


  }

}
