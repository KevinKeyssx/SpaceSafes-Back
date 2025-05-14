import {
    ForbiddenException,
    Injectable,
    NotFoundException,
    OnModuleInit
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { CreateExpenseDto } from '@expenses/dto/create-expense.dto';
import { UpdateExpenseDto } from '@expenses/dto/update-expense.dto';
import { PrismaException }  from '@common/error/prisma-catch';


@Injectable()
export class ExpensesService extends PrismaClient implements OnModuleInit {
    onModuleInit() {
		this.$connect();
	}

    async create( createExpenseDto: CreateExpenseDto ) {
        try {
            return await this.expense.create({
                select: {
                    id: true,
                    name: true,
                    description: true
            },
            data: createExpenseDto,
        });
    } catch ( error ) {
        throw PrismaException.catch( error, 'Expense' );
    }
    }

    async findAll( userId: string ) {
        return await this.expense.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                services: {
                    select: {
                        id: true,
                        name: true,
                        description: true
                    }
                }
            },
            where: { OR: [
                { userId: userId },
                { userId: null }
            ]},
        });
    }


    async findOne( id: string ) {
        const expense = await this.expense.findUnique({
            where: { id },
        });

        if ( !expense ) {
            throw new NotFoundException( 'Expense not found' );
        }

        return expense;
    }


    async update(id: string, updateExpenseDto: UpdateExpenseDto) {
        const expense = await this.findOne( id );

        if ( !expense?.userId ) {
            throw new ForbiddenException( 'You are not authorized to update this expense' );
        }

        try {
            return await this.expense.update({
                select: {
                    id: true,
                    name: true,
                    description: true
                },
                where: { id },
                data: updateExpenseDto,
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'Expense' );
        }
    }

    async remove(id: string) {
        const expense = await this.findOne( id );

        if ( !expense?.userId ) {
            throw new ForbiddenException( 'You are not authorized to delete this expense' );
        }

        try {
            return await this.expense.delete({
                select: {
                    id: true,
                    name: true,
                    description: true
                },
                where: { id },
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'Expense' );
        }
    }
}
