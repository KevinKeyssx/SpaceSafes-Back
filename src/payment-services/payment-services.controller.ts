import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { PaymentServicesService }   from '@payment-services/payment-services.service';
import { CreatePaymentServiceDto }  from '@payment-services/dto/create-payment-service.dto';
import { UpdatePaymentServiceDto }  from '@payment-services/dto/update-payment-service.dto';


@Controller('payment-services')
export class PaymentServicesController {
    constructor(private readonly paymentServicesService: PaymentServicesService) {}

    @Post()
    create(@Body() createPaymentServiceDto: CreatePaymentServiceDto) {
        return this.paymentServicesService.create(createPaymentServiceDto);
    }

    @Get( 'user/:id' )
    findAll(@Param('id') id: string) {
        return this.paymentServicesService.findAll(id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.paymentServicesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePaymentServiceDto: UpdatePaymentServiceDto) {
        return this.paymentServicesService.update(id, updatePaymentServiceDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.paymentServicesService.remove(id);
    }
}
