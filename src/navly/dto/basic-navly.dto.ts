import { ApiProperty } from "@nestjs/swagger";

import { IsOptional, IsString, Length } from "class-validator";


export class BasicNavlyDto {

    @ApiProperty({
        description: 'URL associated with the account',
        example: 'https://example.com/account',
        required: true
    })
    @IsString()
    @Length( 1, 100 )
    url: string;


    @ApiProperty({
        description: 'Optional name associated with the account',
        example: 'John Doe',
        required: false
    })
    @IsOptional()
    @IsString()
    @Length( 1, 100 )
    name?: string;


    @ApiProperty({
        description: 'Optional description associated with the account',
        example: 'Description of the account',
        required: false
    })
    @IsOptional()
    @IsString()
    @Length( 1, 200 )
    description?: string;

}
