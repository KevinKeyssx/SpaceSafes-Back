import { Injectable, NotFoundException } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';

import { Account, Navly, PrismaClient } from '@prisma/client';

import { CreateAccountDto } from '@accounts/dto/create-account.dto';
import { UpdateAccountDto } from '@accounts/dto/update-account.dto';
import { AccountEntity }    from '@accounts/entities/account.entity';
import { PrismaException } from '@common/error/prisma-catch';


import ogs from 'open-graph-scraper';
import { decryptPassword, encryptPassword } from './utils/crypto';


@Injectable()
export class AccountsService extends PrismaClient implements OnModuleInit {
    onModuleInit() {
		this.$connect();
	}


    async create( createAccountDto: CreateAccountDto ) {
        try {
            let navly;

            const { url, ...rest } = createAccountDto;
            let avatar : string | undefined;
            let description : string | undefined;
            let name : string | undefined;

            if ( url ) {
                const { result }    = await ogs({ url });
                avatar        = result.ogImage?.[0].url;
                description   = result.ogDescription;
                name          = result.ogTitle;
            }

            const account = await this.account.create({
                data: {
                    ...rest,
                    password : encryptPassword( rest.password ),
                },
                include: {
                    navly: true
                }
            });

            if ( url ) {
                const existNavly  = await this.navly.findUnique({
                    where: { url_userId: { url, userId: createAccountDto.userId } },
                });

                if ( !existNavly ) {
                    navly = await this.navly.create({
                        data: {
                            url,
                            avatar,
                            description,
                            name,
                            userId: rest.userId,
                            accountId: account.id
                        },
                    });
                }

            }

            // if ( balanceId ) {
            //     await this.navlyBalance.create({
            //         data: {
            //             navlyId         : navly.id,
            //             balanceId       : balanceId,
            //             userId          : createAccountDto.userId,
            //             principal       : true,
            //             expirationDate,
            //         },
            //     });

            //     if ( amount && expirationDatePayment ) {
            //         await this.paymentService.create({
            //             data: {
            //                 userId          : createAccountDto.userId,
            //                 amount          : amount,
            //                 expirationDate: expirationDatePayment,
            //                 serviceId       : 'c712d5df-1b60-4d69-bddf-d8a6e003e3e2',
            //                 navlyId         : navly.id,
            //             },
            //         });
            //     }
            // }

            account.password = decryptPassword( account.password );
            return { account, navly };
        } catch ( error ) {
            if ( error.error ) {
                throw new NotFoundException( 'URL invalid - Page not found' );
            }

            throw PrismaException.catch( error, 'Account' );
        }
    }


    async findAll( userId: string ) {
        const accounts = await this.account.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                password: true,
                createdAt: true,
                updatedAt: true,
                isFavorite: true,
                navly: {
                    select: {
                        url: true,
                    }
                },
            },
            where: { userId }
        });

        return accounts.map(( account ) => ({
            ...account,
            password: decryptPassword( account.password ),
        }));
    }


    async findOne( id: string ) {
        try {
            const account = await this.account.findUnique({
                select: {
                    id: true,
                    name: true,
                    username: true,
                    password: true,
                    createdAt: true,
                    updatedAt: true,
                    navly: {
                        select: {
                            url: true,
                        }
                    },
                },
                where: { id },
            });

            if ( !account ) {
                throw new NotFoundException( 'Account not found' );
            }

            return {
                ...account,
                password: decryptPassword( account.password ),
            };
        } catch ( error ) {
            throw PrismaException.catch( error, 'Account' );
        }
    }


    async update(
        id: string,
        updateAccountDto: UpdateAccountDto
    ) {
        try {

            // TODO: Hay que tener el userId del la request
            // let navly;

            // const { url, ...rest } = updateAccountDto;

            // if ( url ) {
            //     const { result }    = await ogs({ url });
            //     const avatar        = result.ogImage?.[0].url;
            //     const description   = result.ogDescription;
            //     const name          = result.ogTitle;

            //     navly = await this.navly.create({
            //         data: {
            //             url,
            //             avatar,
            //             description,
            //             name,
            //             userId: rest.userId
            //         },
            //     });
            // }

            if ( updateAccountDto.password ) {
                updateAccountDto.password = encryptPassword( updateAccountDto.password );
            }

            const account = await this.account.update({
                where: { id },
                data: updateAccountDto,
                include: {
                    navly: true
                }
            });

            return {
                ...account,
                password: decryptPassword( account.password ),
            };
        } catch ( error ) {
            throw PrismaException.catch( error, 'Account' );
        }
    }


    async remove( id: string ) {
        try {
            const account = await this.account.delete({
                where: { id },
            });

            return account;
        } catch ( error ) {
            throw PrismaException.catch( error, 'Account' );
        }
    }
}
