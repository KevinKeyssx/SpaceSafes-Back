import { ApiProperty } from "@nestjs/swagger";

import {
    IsBoolean,
    IsEnum,
    IsOptional,
    IsString,
    IsUrl,
    Length
} from "class-validator";

import { WebsiteCategory } from "@navly/enum/website-category.enum";


export class BasicNavlyDto {

    @ApiProperty({
        description: 'URL associated with the account',
        example: 'https://example.com/account',
        required: true
    })
    @IsString()
    @Length( 1, 255 )
    @IsUrl()
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

    @ApiProperty({
        description: 'Category of the website',
        example: 'DEVELOPMENT',
        enum: WebsiteCategory,
        enumName: 'WebsiteCategory',
        default: WebsiteCategory.OTHER,
        required: false
    })
    @IsOptional()
    @IsEnum(WebsiteCategory, {
        message: 'category must be a valid WebsiteCategory'
    })
    category?: WebsiteCategory;


    @ApiProperty({
        description: 'Optional favorite associated with the account',
        example: true,
        required: false
    })
    @IsOptional()
    @IsBoolean()
    isFavorite?: boolean;
}
