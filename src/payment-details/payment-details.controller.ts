import { Controller, Get, Post, Body, Param, Delete, ParseArrayPipe, Query } from '@nestjs/common';

import { PaymentDetailsService }            from '@payment-details/payment-details.service';
import { CreateMultiplePaymentDetailDto }   from '@payment-details/dto/create-multiple-payment-detaill.dto';


@Controller('payment-details')
export class PaymentDetailsController {
    constructor(
        private readonly paymentDetailsService: PaymentDetailsService
    ) {}

    @Post( 'multiple' )
    createMultiple(
        @Body() createMultiplePaymentDetailDto: CreateMultiplePaymentDetailDto
    ) {
        return this.paymentDetailsService.createMultiple( createMultiplePaymentDetailDto );
    }


    @Get( ':userId/:month/:year' )
    findAll(
        @Param( 'userId' )  userId  : string,
        @Param( 'month' )   month   : number,
        @Param( 'year' )    year    : number
    ) {
        return this.paymentDetailsService.findAll( userId, month, year );
    }


    @Delete( ':userId' )
    remove(
        @Param( 'userId' ) userId: string,
        @Query('ids', new ParseArrayPipe({ items: String, separator: ',' })) ids: string[]
    ) {
        return this.paymentDetailsService.remove( userId, ids );
    }

}
