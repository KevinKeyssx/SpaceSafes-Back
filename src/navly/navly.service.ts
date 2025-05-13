import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import ogs              from 'open-graph-scraper';

import { CreateNavlyDto } from './dto/create-navly.dto';
import { UpdateNavlyDto } from './dto/update-navly.dto';
import { PrismaException } from '@common/error/prisma-catch';


@Injectable()
export class NavlyService extends PrismaClient implements OnModuleInit {
    onModuleInit() {
		this.$connect();
	}

    async create( createNavlyDto: CreateNavlyDto ) {
        try {
            const { result }    = await ogs({ url: createNavlyDto.url });
            const avatar        = result.ogImage?.[0].url;

            createNavlyDto.description  ??= result.ogDescription;
            createNavlyDto.name         ??= result.ogTitle;

            const navly = await this.navly.create({
                data: {
                    ...createNavlyDto,
                    avatar
                },
            });

            return navly;
        } catch ( error ) {
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
