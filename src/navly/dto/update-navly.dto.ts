import { PartialType } from '@nestjs/mapped-types';
import { CreateNavlyDto } from './create-navly.dto';

export class UpdateNavlyDto extends PartialType(CreateNavlyDto) {}
