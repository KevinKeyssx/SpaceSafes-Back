import { Injectable } from '@nestjs/common';
import { CreateNavlyDto } from './dto/create-navly.dto';
import { UpdateNavlyDto } from './dto/update-navly.dto';

@Injectable()
export class NavlyService {
  create(createNavlyDto: CreateNavlyDto) {
    return 'This action adds a new navly';
  }

  findAll() {
    return `This action returns all navly`;
  }

  findOne(id: number) {
    return `This action returns a #${id} navly`;
  }

  update(id: number, updateNavlyDto: UpdateNavlyDto) {
    return `This action updates a #${id} navly`;
  }

  remove(id: number) {
    return `This action removes a #${id} navly`;
  }
}
