import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

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

            await this.paymentDetail.createMany({
                data: multiplePaymentDetails,
            });

            const balanceReduce: { ids: string; amount: number }[] = paymentDetails
            .reduce((acc, paymentDetail) => {
                const existingItem = acc.find(item => item.ids === paymentDetail.balanceId);

                if (existingItem) {
                    existingItem.amount += paymentDetail.amount;
                } else {
                    acc.push({ ids: paymentDetail.balanceId, amount: paymentDetail.amount });
                }

                return acc;
            }, [] as { ids: string; amount: number }[]);

            await this.$transaction(async (tx) => {
                for (const reduction of balanceReduce) {
                    await tx.balance.update({
                        where: { id: reduction.ids },
                        data: {
                            lastPayment: new Date(),
                            balance: {
                                decrement: reduction.amount,
                            },
                        },
                    });
                }
            });

            return this.findAll( userId, month, year );
        } catch ( error ) {
            throw PrismaException.catch( error, 'PaymentDetail' );
        }
    }


    async findAll( userId: string, month: number, year: number ) {
        return await this.paymentDetail.findMany({
            select: {
                id: true,
                amount: true,
                status: true,
                createdAt: true,
                paymentService: {
                    select: {
                        id: true,
                        description: true
                    }
                },
                balance: {
                    select: {
                        id : true,
                        name: true,
                        type: true,
                        balance: true,
                        lastPayment: true,
                    }
                },
                payment: {
                    select: {
                        id: true,
                        month: true,
                        year: true
                    }
                }
            },
            where: { userId, payment: { month, year } },
        });
    }


    async removeMultiple( userId: string, ids: string[] ) {
        try {
            const paymentDetails = await this.paymentDetail.findMany({
                where: { userId, id: { in: ids } },
            });

            await this.$transaction(async (tx) => {
                for (const paymentDetail of paymentDetails) {
                    await tx.balance.update({
                        where   : { id: paymentDetail.balanceId },
                        data    : {
                            lastPayment: new Date(),
                            balance: {
                                increment: paymentDetail.amount,
                            },
                        },
                    });
                }
            });

            return await this.paymentDetail.deleteMany({
                where: { userId, id: { in: ids } },
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'PaymentDetail' );
        }
    }


    async remove( id: string ) {
        try {
            const paymentDetail = await this.paymentDetail.findUnique({
                where: { id },
            });

            await this.balance.update({
                where   : { id: paymentDetail!.balanceId },
                data    : {
                    lastPayment: new Date(),
                    balance: {
                        increment: paymentDetail!.amount,
                    },
                },
            });

            return await this.paymentDetail.delete({
                where: { id },
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'PaymentDetail' );
        }
    }
}
