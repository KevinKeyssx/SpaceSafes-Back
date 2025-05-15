import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { PrismaException }          from '@common/error/prisma-catch';
import { CreatePaymentServiceDto }  from '@payment-services/dto/create-payment-service.dto';
import { UpdatePaymentServiceDto }  from '@payment-services/dto/update-payment-service.dto';


@Injectable()
export class PaymentServicesService extends PrismaClient implements OnModuleInit {
    onModuleInit() {
		this.$connect();
	}


    async create( createPaymentServiceDto: CreatePaymentServiceDto ) {
        try {
            const paymentService = await this.paymentService.create({
                data: createPaymentServiceDto,
            });

            return paymentService;
        } catch (error) {
            throw PrismaException.catch( error, 'PaymentService' );
        }
    }


    async findAll( userId: string ) {
        try {
            return await this.paymentService.findMany({
                where: { userId },
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'PaymentService' );
        }
    }


    async findOne( id: string ) {
        const paymentService = await this.paymentService.findUnique({
            where: { id },
        });

        if ( !paymentService ) {
            throw new NotFoundException( 'PaymentService not found' );
        }

        return paymentService;
    }


    async update( id: string, updatePaymentServiceDto: UpdatePaymentServiceDto ) {
        try {
            return await this.paymentService.update({
                where: { id },
                data: updatePaymentServiceDto,
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'PaymentService' );
        }
    }


    async remove( id: string ) {
        try {
            return await this.paymentService.delete({
                where: { id },
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'PaymentService' );
        }
    }
}
