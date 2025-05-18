import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { PrismaException } from '@common/error/prisma-catch';


@Injectable()
export class BalancesService extends PrismaClient implements OnModuleInit {

    onModuleInit() {
		this.$connect();
	}

    #selectBalance = {
        id                  : true,
        name                : true,
        type                : true,
        balance             : true,
        typeCard            : true,
        cardNumber          : true,
        accountNumber       : true,
        bankName            : true,
        expirationDate      : true,
        verificationNumber  : true,
        lastPayment         : true,
        createdAt           : true,
        updatedAt           : true,
        isFavorite          : true,
        navlyBalances       : {
            select: {
                navly: {
                    select: {
                        name: true,
                        url: true,
                        category: true,
                    }
                }

            }
        }
    };


    async create( createBalanceDto: CreateBalanceDto ) {
        try {
            return await this.balance.create({
                data: createBalanceDto,
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'Balance' );
        }
    }


    async findAll( userId: string ) {
        try {
            return await this.balance.findMany({
                select: this.#selectBalance,
                where: {
                    userId,
                },
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'Balance' );
        }
    }


    async findOne(id: string) {
        try {
            return await this.balance.findUnique({
                select: this.#selectBalance,
                where: {
                    id,
                },
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'Balance' );
        }
    }


    async update(id: string, updateBalanceDto: UpdateBalanceDto) {
        try {
            return await this.balance.update({
                select: this.#selectBalance,
                where: {
                    id,
                },
                data: updateBalanceDto,
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'Balance' );
        }
    }


    async remove(id: string) {
        try {
            return await this.balance.delete({
                where: {
                    id,
                },
            });
        } catch ( error ) {
            throw PrismaException.catch( error, 'Balance' );
        }
    }
}
