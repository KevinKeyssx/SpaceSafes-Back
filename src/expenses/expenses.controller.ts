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

import { ExpensesService }  from '@expenses/expenses.service';
import { CreateExpenseDto } from '@expenses/dto/create-expense.dto';
import { UpdateExpenseDto } from '@expenses/dto/update-expense.dto';


@Controller('expenses')
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService) {}

    @Post()
    create(@Body() createExpenseDto: CreateExpenseDto) {
        return this.expensesService.create(createExpenseDto);
    }


    @Get( 'user/:id' )
    findAll(
        @Param( 'id' ) id: string
    ) {
        return this.expensesService.findAll( id );
    }


    @Get( ':id' )
    findOne(
        @Param( 'id', ParseUUIDPipe ) id: string
    ) {
        return this.expensesService.findOne( id );
    }


    @Patch( ':id' )
    update(
        @Param( 'id', ParseUUIDPipe ) id: string,
        @Body() updateExpenseDto: UpdateExpenseDto
    ) {
        return this.expensesService.update( id, updateExpenseDto );
    }


    @Delete( ':id' )
    remove(
        @Param( 'id', ParseUUIDPipe ) id: string
    ) {
        return this.expensesService.remove( id );
    }
}
