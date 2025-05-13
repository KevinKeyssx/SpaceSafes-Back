import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class BasicAccountDto {
    @ApiProperty({
        description: 'Username for the account',
        example: 'john_doe',
        required: true
    })
    @IsString()
    @Length( 3, 100 )
    username: string;

    @ApiProperty({
        description: 'Password for the account',
        example: 'StrongP@ssw0rd',
        required: true
    })
    @IsString()
    @Length( 1, 100 )
    password: string;

    @ApiProperty({
        description: 'Optional URL associated with the account',
        example: 'https://example.com/account',
        required: false
    })
    @IsOptional()
    @IsString()
    @Length( 1, 100 )
    url?: string;
}
