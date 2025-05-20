import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import ogs              from 'open-graph-scraper';

import { PrismaException }  from '@common/error/prisma-catch';
import { CreateNavlyDto }   from '@navly/dto/create-navly.dto';
import { UpdateNavlyDto }   from '@navly/dto/update-navly.dto';
import { WebsiteCategory }  from '@navly/enum/website-category.enum';


@Injectable()
export class NavlyService extends PrismaClient implements OnModuleInit {
    onModuleInit() {
		this.$connect();
	}

    #extractMainNameFromUrl( url: string ): string {
        try {
            const parsedUrl = new URL( url );
            let hostname = parsedUrl.hostname;

            if ( !hostname ) {
                return 'Mi sitio web';
            }

            hostname = hostname.replace( /^www\./, '').replace(/^web\./, '').replace(/^m\./, '').replace(/\/$/, '' );

            const parts = hostname.split( '.' );

            if ( parts.length >= 2 ) {
                let name = parts.slice( 0, parts.length - ( parts[parts.length - 1] === 'com' ? 1 : 0 )).join( '.' );

                const subParts = name.split( '.' );

                if ( subParts.length > 1 ) {
                    name = subParts[subParts.length - 1];

                    if ( subParts.length >= 2 && subParts[subParts.length - 2] !== 'com' ) {
                        return `${this.#capitalizeFirstLetter(subParts[subParts.length - 2])} ${this.#capitalizeFirstLetter( name )}`;
                    }
                }

                return this.#capitalizeFirstLetter( name );
            } else if ( parts.length === 1 ) {
                return this.#capitalizeFirstLetter( parts[0] );
            }

            return this.#capitalizeFirstLetter( hostname );
        } catch ( error ) {
            return 'Mi sitio web';
        }
    }


    #capitalizeFirstLetter( str: string ): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    async createNavlyBasic( createNavlyDto: CreateNavlyDto, avatar?: string ) {
        const { balanceIds, expirationDate, amount, ...navlyDto } = createNavlyDto
        const idsToUse = balanceIds?.length ? balanceIds : [];

        if ( idsToUse.length > 0 ) {
            const balances = await this.balance.findMany({
                where: { id: { in: idsToUse }},
            });

            if ( balances.length !== idsToUse.length ) {
                throw new Error( 'One or more balances not found' );
            }
        }

        const navly = await this.navly.create({
            data: {
                ...navlyDto,
                avatar
            },
        });

        if ( idsToUse.length > 0 ) {
            await this.navlyBalance.createMany({
                data: idsToUse.map(( id, index ) => ({
                    navlyId         : navly.id,
                    balanceId       : id,
                    userId          : createNavlyDto.userId,
                    principal       : index === 0,
                    expirationDate,
                    amount
                })),
            });

            if ( amount && expirationDate ) {
                await this.paymentService.create({
                    data: {
                        userId          : createNavlyDto.userId,
                        amount          : amount,
                        expirationDate  : expirationDate,
                        serviceId       : 'c712d5df-1b60-4d69-bddf-d8a6e003e3e2',
                        navlyId         : navly.id,
                    },
                });
            }
        }

        return this.findOne( navly.id );
    }


    async create( createNavlyDto: CreateNavlyDto ) {
        try {
            const { result }    = await ogs({ url: createNavlyDto.url });
            const avatar        = result.ogImage?.[0].url;

            createNavlyDto.description  ??= result.ogDescription;
            createNavlyDto.name         ??= result.ogSiteName ?? result.ogTitle ?? this.#extractMainNameFromUrl( createNavlyDto.url );

            return await this.createNavlyBasic( createNavlyDto, avatar );
        } catch ( error ) {
            if ( error.error ) {
                createNavlyDto.name        ??= this.#extractMainNameFromUrl( createNavlyDto.url );
                createNavlyDto.description ??= 'Sin descripción';
                createNavlyDto.category    ??= WebsiteCategory.OTHER;

                return await this.createNavlyBasic( createNavlyDto, undefined );
            }

            throw PrismaException.catch( error, 'Navly' );
        }
    }


    #selectNavly = {
        id: true,
        name: true,
        avatar: true,
        description: true,
        url: true,
        createdAt: true,
        updatedAt: true,
        category: true,
        lastViewed: true,
        isFavorite: true,
        navlyBalances: {
            select: {
                id: true,
                principal: true,
                expirationDate: true,
                createdAt: true,
                updatedAt: true,
                amount: true,
                balance: {
                    select: {
                        id: true,
                        name: true,
                        balance: true,
                        type: true
                    }
                }
            }
        },
        account: {
            select: {
                id: true,
                name: true,
                username: true,
            }
        }
    }


    async findAll(
        userId: string
    ) {
        try {
            return await this.navly.findMany({
                select: this.#selectNavly,
                where: { userId },
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'Navly' );
        }
    }


    async findOne( id: string ) {
        try {
            return await this.navly.findUnique({
                select  : this.#selectNavly,
                where   : { id },
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'Navly' );
        }
    }


    async findOneBasic( id: string ) {
        try {
            return await this.navly.findUnique({
                select: this.#selectNavly,
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
            updateNavlyDto.name         ??= result.ogSiteName ?? result.ogTitle ?? this.#extractMainNameFromUrl( updateNavlyDto.url );

            // TODO: Cuando suba imagenes
            // updateNavlyDto.avatar       ??= result.ogImage?.[0].url;
            updateNavlyDto.avatar       = result.ogImage?.[0].url;
        }

        if ( updateNavlyDto.balanceIds ) {
            const navlyBalance = await this.navlyBalance.findMany({
                where: { navlyId: id },
            });

            const navlyBalancedIds = navlyBalance.map(( balance ) => balance.balanceId);
            const newBalancesIds = updateNavlyDto.balanceIds.filter(( balanceId ) => !navlyBalancedIds.includes( balanceId ));

            if ( newBalancesIds.length > 0 ) {
                await this.navlyBalance.createMany({
                    data: newBalancesIds.map(( balanceId ) => ({
                        navlyId: id,
                        balanceId,
                        userId: updateNavlyDto.userId,
                    })),
                });
            }
        }

        const { amount, balanceIds, expirationDate, ...rest } = updateNavlyDto;

        try {
            return await this.navly.update({
                where: { id },
                data: rest,
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


    async removeNavlyBalance( id: string ) {
        try {
            return await this.navlyBalance.delete({
                where: { id },
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'NavlyBalance' );
        }
    }
}
