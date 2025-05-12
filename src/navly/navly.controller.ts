import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NavlyService } from './navly.service';
import { CreateNavlyDto } from './dto/create-navly.dto';
import { UpdateNavlyDto } from './dto/update-navly.dto';

@Controller('navly')
export class NavlyController {
  constructor(private readonly navlyService: NavlyService) {}

  @Post()
  create(@Body() createNavlyDto: CreateNavlyDto) {
    return this.navlyService.create(createNavlyDto);
  }

  @Get()
  findAll() {
    return this.navlyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.navlyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNavlyDto: UpdateNavlyDto) {
    return this.navlyService.update(+id, updateNavlyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.navlyService.remove(+id);
  }
}
