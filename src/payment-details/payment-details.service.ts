import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient, StatusPayment } from '@prisma/client';

import { PrismaException }                  from '@common/error/prisma-catch';
import { CreateMultiplePaymentDetailDto }   from '@payment-details/dto/create-multiple-payment-detaill.dto';


@Injectable()
export class PaymentDetailsService extends PrismaClient implements OnModuleInit {
    onModuleInit() {
		this.$connect();
	}

    async createMultiple( createMultiplePaymentDetailDto: CreateMultiplePaymentDetailDto ) {
        try {
            const { month, year, userId, paymentDetails } = createMultiplePaymentDetailDto;

            let payment = await this.payment.findUnique({
                select: {
                    id: true
                },
                where: {
                    month_year_userId: {
                        month,
                        year,
                        userId
                    }
                }
            });

            if ( !payment ) {
                payment = await this.payment.create({
                    select: {
                        id: true
                    },
                    data: {
                        month,
                        year,
                        userId
                    }
                })
            }

            const multiplePaymentDetails = paymentDetails.map(( paymentDetail ) => ({
                ...paymentDetail,
                userId,
                paymentId: payment!.id,
                status: StatusPayment.COMPLETED
            }));

            const multiplePaymentDetailsDB = await this.paymentDetail.createMany({
                data: multiplePaymentDetails,
            });

            return multiplePaymentDetailsDB;
        } catch (error) {
            throw PrismaException.catch( error, 'PaymentDetail' );
        }
    }


    async findAll( userId: string, month: number, year: number ) {
        return await this.paymentDetail.findMany({
            where: { userId, payment: { month, year } },
        });
    }

    async remove( userId: string, ids: string[] ) {
        try {
            return await this.paymentDetail.deleteMany({
                where: { userId, id: { in: ids } },
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'PaymentDetail' );
        }
    }
}
