import { Module } from '@nestjs/common';
import { NavlyService } from './navly.service';
import { NavlyController } from './navly.controller';

@Module({
  controllers: [NavlyController],
  providers: [NavlyService],
})
export class NavlyModule {}
