import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    getHello(): string {
        return 'Welcome to Space Safes API! powered by KevinKeyssx https://github.com/KevinKeyssx/SpaceSafes-Back';
    }
}
