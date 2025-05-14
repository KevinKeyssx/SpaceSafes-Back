import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { ServicesService }   from '@services/services.service';
import { CreateServiceDto }  from '@services/dto/create-service.dto';
import { UpdateServiceDto }  from '@services/dto/update-service.dto';


@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Post()
    create(@Body() createServiceDto: CreateServiceDto) {
        return this.servicesService.create(createServiceDto);
    }

    @Get( 'user/:id' )
    findAll(
        @Param('id') id: string
    ) {
        return this.servicesService.findAll( id );
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.servicesService.findOne( id );
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
        return this.servicesService.update( id, updateServiceDto );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.servicesService.remove( id );
    }
}
