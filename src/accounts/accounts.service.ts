import { Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';

import { Account, Navly, PrismaClient } from '@prisma/client';

import { CreateAccountDto } from '@accounts/dto/create-account.dto';
import { UpdateAccountDto } from '@accounts/dto/update-account.dto';
import { AccountEntity }    from '@accounts/entities/account.entity';
import { PrismaException } from '@common/error/prisma-catch';


import ogs from 'open-graph-scraper';


@Injectable()
export class AccountsService extends PrismaClient implements OnModuleInit {
    onModuleInit() {
		this.$connect();
	}


    async create( createAccountDto: CreateAccountDto ) {
        try {
            let navly;

            const { url, ...rest } = createAccountDto;

            if ( url ) {
                const { result }    = await ogs({ url });
                const avatar        = result.ogImage?.[0].url;
                const description   = result.ogDescription;
                const name          = result.ogTitle;

                navly = await this.navly.create({
                    data: {
                        url,
                        avatar,
                        description,
                        name,
                        userId: rest.userId
                    },
                });
            }

            const account = await this.account.create({
                data: rest,
            });

            return { account, navly };
        } catch ( error ) {
            throw PrismaException.catch( error, 'Account' );
        }
    }


    async findAll( userId: string ) {
        return await this.account.findMany({
            select: {
                id: true,
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
            where: { userId }
        });
    }


    async findOne( id: string ) {
        try {
            const account = await this.account.findUnique({
                select: {
                    id: true,
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

            return account;
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

            const account = await this.account.update({
                where: { id },
                data: updateAccountDto,
            });

            return account;
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
