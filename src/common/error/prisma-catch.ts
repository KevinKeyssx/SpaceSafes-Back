import {
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    UnauthorizedException,
    UnprocessableEntityException
} from '@nestjs/common';


export enum ERROR_MESSAGES {
    ALREADY_EXISTS  = 'P2002',
    NOT_FOUND       = 'P2003',
    NOT_UNIQUE      = 'P2004',
    NOT_NULL        = 'P2005',
    NOT_EXIST       = 'P2025',
    UNKNOWN         = 'P0000x'
}


export class PrismaException {
    static readonly #logger = new Logger( PrismaException.name );

    static catch( exception: any, message?: string ) {
        const response = exception?.response?.message || 'Unknown error';

        if ( exception.status === 400 ) {
            this.#logger.error( response );
            throw new BadRequestException( response );
        }

        if ( exception.status === 401 ) {
            this.#logger.error( response );
            throw new UnauthorizedException( response );
        }

        if ( exception.status === 403 ) {
            this.#logger.error( response );
            throw new ForbiddenException( response );
        }

        if ( exception.status === 404 ) {
            this.#logger.error( response );
            throw new NotFoundException( response );
        }

        if ( exception.status === 422 ) {
            this.#logger.error( response );
            throw new UnprocessableEntityException( response );
        }

        if (exception.code === ERROR_MESSAGES.ALREADY_EXISTS) {
            this.#logger.error(`${message ?? exception.meta.target} already exists.`);
            throw new BadRequestException( `${ message ?? exception.meta.target} already exists.` );
        }

        if (exception.code === ERROR_MESSAGES.NOT_FOUND) {
            const id = (exception.message as string).split(':')[2].split('_')[0].replace(' `', '');
            this.#logger.error( `${message ?? id} not found.`);
            throw new NotFoundException( `${ message ?? id} not found.` );
        }

        if (exception.code === ERROR_MESSAGES.NOT_EXIST) {
            this.#logger.error(`${message ?? 'Record' } Not exist.`);
            throw new NotFoundException( `${ message ?? 'Record'} Not exist.` );
        }

        this.#logger.error( `Error unknown ${ERROR_MESSAGES.UNKNOWN}: ${exception.code}` );
        throw new InternalServerErrorException( `Error unknown ${ERROR_MESSAGES.UNKNOWN}: ${exception.code}` );
    }
}
