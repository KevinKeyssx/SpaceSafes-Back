import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import ogs              from 'open-graph-scraper';

import { CreateNavlyDto }   from '@navly/dto/create-navly.dto';
import { UpdateNavlyDto }   from '@navly/dto/update-navly.dto';
import { PrismaException }  from '@common/error/prisma-catch';


@Injectable()
export class NavlyService extends PrismaClient implements OnModuleInit {
    onModuleInit() {
		this.$connect();
	}


    async create( createNavlyDto: CreateNavlyDto ) {
        try {
            const { balanceId, expirationDatePayment, expirationDate, amount, ...navlyDto } = createNavlyDto
            const { result }    = await ogs({ url: createNavlyDto.url });
            const avatar        = result.ogImage?.[0].url;

            navlyDto.description  ??= result.ogDescription;
            navlyDto.name         ??= result.ogTitle;

            if ( balanceId ) {
                const balance = await this.balance.findUnique({
                    where: { id: balanceId },
                });

                if ( !balance ) {
                    throw new Error('Balance not found');
                }
            }

            const navly = await this.navly.create({
                data: {
                    ...navlyDto,
                    avatar
                },
            });

            if ( balanceId ) {
                await this.navlyBalance.create({
                    data: {
                        navlyId         : navly.id,
                        balanceId       : balanceId,
                        userId          : createNavlyDto.userId,
                        principal       : true,
                        expirationDate,
                    },
                });

                if ( amount && expirationDatePayment ) {
                    await this.paymentService.create({
                        data: {
                            userId          : createNavlyDto.userId,
                            amount          : amount,
                            expirationDate  : expirationDatePayment,
                            serviceId       : 'c712d5df-1b60-4d69-bddf-d8a6e003e3e2',
                            navlyId         : navly.id,
                        },
                    });
                }
            }

            return navly;
        } catch ( error ) {
            if ( error.error ) {
                throw new NotFoundException( error.result.error ?? 'Page not found');
            }

            throw PrismaException.catch( error, 'Navly' );
        }
    }


    async findAll(
        userId: string
    ) {
        try {
            return await this.navly.findMany({
                where: { userId },
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'Navly' );
        }
    }


    async findOne(
        id: string
    ) {
        try {
            return await this.navly.findUnique({
                where: { id },
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'Navly' );
        }
    }


    async update(
        id: string,
        updateNavlyDto: UpdateNavlyDto
    ) {
        if ( updateNavlyDto.url ) {
            const { result }    = await ogs({ url: updateNavlyDto.url });

            updateNavlyDto.description  ??= result.ogDescription;
            updateNavlyDto.name         ??= result.ogTitle;
            updateNavlyDto.avatar       ??= result.ogImage?.[0].url;
        }

        try {
            return await this.navly.update({
                where: { id },
                data: updateNavlyDto,
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'Navly' );
        }
    }


    async remove( id: string ) {
        try {
            return await this.navly.delete({
                where: { id },
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'Navly' );
        }
    }
}
