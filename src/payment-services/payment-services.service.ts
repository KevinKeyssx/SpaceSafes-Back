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

    #selectPaymentService = {
        id: true,
        description: true,
        amount: true,
        expirationDate: true,
        navly: {
            select: {
                id: true,
                name: true,
                avatar: true,
                url: true,
                createdAt: true,
                updatedAt: true,
                category: true,
                lastViewed: true,
                isFavorite: true,
            }
        },
        service: {
            select: {
                id: true,
                name: true,
                description: true,
            }
        }
    }


    async create( createPaymentServiceDto: CreatePaymentServiceDto ) {
        try {
            const paymentService = await this.paymentService.create({
                select: this.#selectPaymentService,
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
                select: this.#selectPaymentService,
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
                select: this.#selectPaymentService,
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
