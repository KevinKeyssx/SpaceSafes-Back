import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsPositive, Max, Min } from "class-validator";

export class PaginationDto {

	@IsOptional()
    @IsNumber()
	@Min( 0 )
	@Max( 1000 )
    @Type(() => Number)
	page: number = 0;

	@IsOptional()
	@IsPositive()
	@Min( 1 )
	@Max( 5000 )
    @Type(() => Number)
	each: number = 10;

	@IsOptional()
	@IsEnum( [ 'asc', 'desc' ] )
	order: 'asc' | 'desc' = 'asc';

}