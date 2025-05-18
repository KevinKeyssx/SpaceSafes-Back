import { ApiProperty, PartialType } from '@nestjs/swagger';

import { BasicNavlyDto } from './basic-navly.dto';
import { IsDate, IsNumber, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateNavlyDto extends PartialType( BasicNavlyDto ) {
    @ApiProperty({
        description: 'Avatar associated with the navly',
        example    : 'https://example.com/navly',
        required   : false
    })
    @IsOptional()
    @IsString()
    @Length( 1, 100 )
    avatar?: string;

    @ApiProperty({
        description: 'IDs of balances associated with the navly',
        example    : ['id1', 'id2'],
        required   : false,
        isArray    : true
    })
    @IsOptional()
    @IsString({ each: true })
    @IsUUID('all', { each: true })
    balanceIds?: string[];


    @ApiProperty({
        description : 'User ID associated with the account (from Clerk)',
        example     : 'user_2NxVQKoXkIFwWvEQQjGYMXdGJqS',
        required    : true
    })
    @IsString()
    @Length( 10, 50 )
    userId: string;

    @ApiProperty({
        description: 'Expiration date of the navly',
        example    : '2022-01-01',
        required   : false
    })
    @IsOptional()
    @IsDate()
	@Transform(({ value }) => new Date(value))
    expirationDate?: Date;

    @ApiProperty({
        description: 'Amount of the navly',
        example    : 100,
        required   : false
    })
    @IsOptional()
    @IsNumber()
    amount?: number;
}
