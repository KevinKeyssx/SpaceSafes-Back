import { ApiProperty, PartialType } from '@nestjs/swagger';

import { BasicNavlyDto } from './basic-navly.dto';
import { IsOptional, IsString, Length } from 'class-validator';

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
}
