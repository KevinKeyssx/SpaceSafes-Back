import { Injectable, NotFoundException } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { CreateAccountDto } from '@accounts/dto/create-account.dto';
import { UpdateAccountDto } from '@accounts/dto/update-account.dto';
import { PrismaException } from '@common/error/prisma-catch';
import { NavlyService } from '@navly/navly.service';
import { decryptPassword, encryptPassword } from './utils/crypto';


@Injectable()
export class AccountsService extends PrismaClient implements OnModuleInit {
    constructor(
        private readonly navlyService: NavlyService
    ) {
        super();
    }
    
    onModuleInit() {
		this.$connect();
	}


    async create( createAccountDto: CreateAccountDto ) {
        try {
            let navly;

            const { url, ...rest } = createAccountDto;

            const account = await this.account.create({
                data: {
                    ...rest,
                    password : encryptPassword( rest.password ),
                }
            });

            const navlyExists = await this.navly.findFirst({
                where: {
                    url,
                    accountId: account.id
                }
            });

            if ( url && !navlyExists ) {
                navly = await this.navlyService.create({
                    url,
                    userId: rest.userId,
                    accountId: account.id
                });
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

            let accountWithNavly = await this.account.findUnique({
                where: { id: account.id },
                include: {
                    navly: true
                }
            });

            accountWithNavly!.password = decryptPassword( accountWithNavly!.password );
            return { account: accountWithNavly, navly };
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
            const { url, ...rest } = updateAccountDto;

            let oldNavly;

            if ( url ) {
                oldNavly = await this.navly.findFirst({
                    where: {
                        url,
                    },
                    select: {
                        url: true,
                        id: true
                    }
                });
            }

            if ( rest.password ) {
                rest.password = encryptPassword( rest.password );
            }

            const account = await this.account.update({
                where: { id },
                data: rest,
                include: {
                    navly: true
                }
            });

            if ( oldNavly ) {
                if ( url !== oldNavly.url ) {
                    await this.navlyService.update( oldNavly.id, {
                        url,
                        userId: account.userId,
                    });
                }
            } else {
                if ( url ) {
                    await this.navlyService.create({
                        url,
                        userId: account.userId,
                        accountId: account.id,
                    });
                }
            }

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
