import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe
} from '@nestjs/common';

import { NavlyService } from './navly.service';
import { CreateNavlyDto } from './dto/create-navly.dto';
import { UpdateNavlyDto } from './dto/update-navly.dto';


@Controller( 'navly' )
export class NavlyController {
    constructor(private readonly navlyService: NavlyService) {}


    @Post()
    create(
        @Body() createNavlyDto: CreateNavlyDto
    ) {
        return this.navlyService.create( createNavlyDto );
    }


    @Get( 'user/:id' )
    findAll(
        @Param( 'id' ) id: string
    ) {
        return this.navlyService.findAll( id );
    }


    @Get( ':id' )
    findOne(
        @Param('id', ParseUUIDPipe ) id: string
    ) {
        return this.navlyService.findOne( id );
    }


    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe ) id: string,
        @Body() updateNavlyDto: UpdateNavlyDto
    ) {
        return this.navlyService.update( id, updateNavlyDto );
    }


    @Delete(':id')
    remove(
        @Param('id', ParseUUIDPipe ) id: string
    ) {
        return this.navlyService.remove( id );
    }
}
