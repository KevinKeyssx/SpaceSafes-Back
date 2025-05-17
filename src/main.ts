import {
	DocumentBuilder,
	SwaggerModule
}                                   from '@nestjs/swagger';
import { NestFactory }              from '@nestjs/core';
import { Logger, ValidationPipe }   from '@nestjs/common';

import { AppModule } from './app.module';
import { ClerkGuard } from '@common/guards/clerk.guard';


( async () => {
	const logger    = new Logger( 'Main' );
    const app       = await NestFactory.create( AppModule );

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        })
    )
    .useGlobalGuards(
        new ClerkGuard()
    )
    .setGlobalPrefix( 'api/v1' )
    .enableCors({
        origin: [ 'http://localhost:3017','http://localhost:4321', 'https://space-safes.vercel.app' ],
        methods: [ 'GET', 'POST', 'PATCH', 'DELETE' ],
        credentials: true,
    });

    const config = new DocumentBuilder()
        .setTitle( 'Space Safes Documentation' )
        .setDescription( 'Space Safes API Documentation' )
        .setVersion( '1.0' )
        .build();

    const document = SwaggerModule.createDocument( app, config );
    SwaggerModule.setup( 'docs', app, document );

    await app.listen( process.env.PORT ?? 3000 );

    logger.log( `Application is running on: ${ await app.getUrl() }` );
})();
