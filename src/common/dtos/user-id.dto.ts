import { ApiProperty } from '@nestjs/swagger';

import { IsString, Length } from 'class-validator';

export class UserIdDto {

    @ApiProperty({
        description : 'User ID associated with the account (from Clerk)',
        example     : 'user_2NxVQKoXkIFwWvEQQjGYMXdGJqS',
        required    : true
    })
    @IsString()
    @Length( 10, 50 )
    userId: string;

}
