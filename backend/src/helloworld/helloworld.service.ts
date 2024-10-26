import { Inject, Injectable } from '@nestjs/common';
import { CreateHelloworldDto } from './dto/create-helloworld.dto';
import { UpdateHelloworldDto } from './dto/update-helloworld.dto';
import { Repository } from 'typeorm';
import { Helloworld } from './entities/helloworld.entity';

@Injectable()
export class HelloworldService {
  constructor(
    @Inject('HELLOWORLD_REPOSITORY')
    private helloworldRepository: Repository<Helloworld>,
  ) {}

  async create(createHelloworldDto: CreateHelloworldDto) {
    return await this.helloworldRepository.save(createHelloworldDto);
  }

  async findAll() {
    return await this.helloworldRepository.find();
  }

  async findOne(id: number) {
    return await this.helloworldRepository.findOne({ where: { id } });
  }

  async update(id: number, updateHelloworldDto: UpdateHelloworldDto) {
    return await this.helloworldRepository.update(id, updateHelloworldDto);
  }

  async remove(id: number) {
    return await this.helloworldRepository.delete(id);
  }
}
