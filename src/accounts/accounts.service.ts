import { Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';

import { Account, PrismaClient } from '@prisma/client';

import { CreateAccountDto } from '@accounts/dto/create-account.dto';
import { UpdateAccountDto } from '@accounts/dto/update-account.dto';
import { AccountEntity }    from '@accounts/entities/account.entity';


@Injectable()
export class AccountsService extends PrismaClient implements OnModuleInit {
    onModuleInit() {
		this.$connect();
	}


    create( createAccountDto: CreateAccountDto ) {
        try {
            const account = this.account.create({
                select : {
                    id: true,
                    userId: true,
                    username: true,
                    password: true,
                    createdAt: true,
                    updatedAt: true,
                    navly: {
                        select: {
                            url: true,
                        }
                    },
                    version: true
                },
                data: createAccountDto,
            });

            return account;
        } catch ( error ) {
            throw error;
        }
    }

    findAll() {
        return `This action returns all accounts`;
    }

    findOne(id: number) {
        return `This action returns a #${id} account`;
    }

    update(id: number, updateAccountDto: UpdateAccountDto) {
        return `This action updates a #${id} account`;
    }

    remove(id: number) {
        return `This action removes a #${id} account`;
    }
}
