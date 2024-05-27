import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pets } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { ResponseFormat } from 'src/common/response.fomat';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pets) private petsRepository: Repository<Pets>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async create(
    createPetDto: CreatePetDto,
    user: Users,
  ): Promise<ResponseFormat<Pets>> {
    try {
      let userDb = await this.userRepository.findOne({
        where: {
          id: user.id,
        },
      });

      if (!userDb) {
        throw new BadRequestException('User not found');
      }

      const petData = {
        ...createPetDto,
        user: userDb,
      };

      let pet = await this.petsRepository.save(petData);
      return { data: pet, message: 'Pet created successfully' };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<ResponseFormat<Pets[]>> {
    const pets = await this.petsRepository.find();
    return { data: pets, message: 'Pets Founded' };
  }

  async findOne(id: number): Promise<ResponseFormat<Pets>> {
    const pet = await this.petsRepository.findOne({ where: { id } });
    return { data: pet, message: 'Pets founded' };
  }

  async update(
    id: number,
    updatePetDto: UpdatePetDto,
  ): Promise<ResponseFormat<Pets>> {
    const pet = await this.petsRepository.findOne({ where: { id } });

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    const updatedPet = Object.assign(pet, updatePetDto);
    await this.petsRepository.save(updatedPet);

    return { data: updatedPet, message: 'Pet updated successfully' };
  }

  async remove(id: number): Promise<ResponseFormat<null>> {
    return { data: null, message: 'Pet deleted successfully' };
  }
}
