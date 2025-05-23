import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';

@Controller('balances')
export class BalancesController {
    constructor(private readonly balancesService: BalancesService) {}

    @Post()
    create(
        @Body() createBalanceDto: CreateBalanceDto
    ) {
        return this.balancesService.create( createBalanceDto );
    }


    @Get('user/:id')
    findAll(
        @Param('id') userId: string
    ) {
        return this.balancesService.findAll( userId );
    }


    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe ) id: string) {
        return this.balancesService.findOne( id );
    }


    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe ) id: string,
        @Body() updateBalanceDto: UpdateBalanceDto
    ) {
        return this.balancesService.update( id, updateBalanceDto );
    }


    @Delete(':id')
    remove(
        @Param('id', ParseUUIDPipe ) id: string
    ) {
        return this.balancesService.remove( id );
    }
}
