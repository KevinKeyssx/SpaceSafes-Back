import {
    ForbiddenException,
    Injectable,
    NotFoundException,
    OnModuleInit
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { CreateServiceDto } from '@services/dto/create-service.dto';
import { UpdateServiceDto } from '@services/dto/update-service.dto';
import { PrismaException }  from '@common/error/prisma-catch';


@Injectable()
export class ServicesService extends PrismaClient implements OnModuleInit {
    onModuleInit() {
		this.$connect();
	}


    async create(createServiceDto: CreateServiceDto) {
        try {
            return await this.service.create({
                select: {
                    id: true,
                    name: true,
                    description: true
                },
                data: createServiceDto,
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'Service' );
        }
    }

    async findAll( userId: string ) {
        try {
            return await this.service.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    expense: {
                        select: {
                            id: true,
                            name: true,
                            description: true
                        }
                    }
                },

                where: { OR: [{ userId }, { userId: null }] },
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'Service' );
        }
    }


    async findOne( id: string ) {
        const service = await this.service.findUnique({
            where: {
                id,
            },
        });

        if ( !service ) {
            throw new NotFoundException( 'Service not found' );
        }

        return service; 
    }


    async update( id: string, updateServiceDto: UpdateServiceDto ) {
        const service = await this.findOne( id );

        if ( !service?.userId ) {
            throw new ForbiddenException( 'You are not authorized to update this service' );
        }

        try {
            return await this.service.update({
                select: {
                    id: true,
                    name: true,
                    description: true
                },
                where: {
                    id,
                },
                data: updateServiceDto,
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'Service' );
        }
    }

    async remove( id: string ) {
        const service = await this.findOne( id );

        if ( !service?.userId ) {
            throw new ForbiddenException( 'You are not authorized to delete this service' );
        }

        try {
            return await this.service.delete({
                select: {
                    id: true,
                    name: true,
                    description: true
                },
                where: {
                    id,
                },
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'Service' );
        }
    }
}
