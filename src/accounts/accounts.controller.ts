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

import { AccountsService }  from '@accounts/accounts.service';
import { CreateAccountDto } from '@accounts/dto/create-account.dto';
import { UpdateAccountDto } from '@accounts/dto/update-account.dto';


@Controller( 'accounts' )
export class AccountsController {
    constructor(
        private readonly accountsService: AccountsService
    ) {}


    @Post()
    create(
        @Body() createAccountDto: CreateAccountDto
    ) {
        return this.accountsService.create( createAccountDto );
    }


    @Get( '/user/:id' )
    findAll(
        @Param( 'id' ) userId: string
    ) {
        return this.accountsService.findAll( userId );
    }


    @Get( ':id' )
    findOne(
        @Param( 'id', ParseUUIDPipe ) id: string
    ) {
        return this.accountsService.findOne( id );
    }


    @Patch( ':id' )
    update(
        @Param('id', ParseUUIDPipe ) id: string,
        @Body() updateAccountDto: UpdateAccountDto
    ) {
        return this.accountsService.update( id, updateAccountDto );
    }


    @Delete( ':id' )
    remove(
        @Param('id', ParseUUIDPipe ) id: string
    ) {
        return this.accountsService.remove( id );
    }
}
