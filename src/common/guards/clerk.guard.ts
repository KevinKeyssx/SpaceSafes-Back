import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException
} from '@nestjs/common';

import { verifyToken } from '@clerk/clerk-sdk-node';

@Injectable()
export class ClerkGuard implements CanActivate {
    async canActivate( context: ExecutionContext ): Promise<boolean> {
        const request   = context.switchToHttp().getRequest();
        const token     = this.extractToken( request );

        if ( !token ) {
            throw new UnauthorizedException( 'Token no proporcionado' );
        }

        try {
            const payload = await verifyToken(
                token, {
                    secretKey: process.env.CLERK_SECRET_KEY
                }
            );

            request.auth = {
                userId      : payload.sub,
                sessionId   : payload.sid,
                claims      : payload
            };
        
            return true;
        } catch ( error ) {
            console.error( 'Clerk verification error:', error );
            throw new UnauthorizedException( 'Token inválido' );
        }
    }

    private extractToken( request: Request ): string | null {
        const authHeader = request.headers['authorization'];

        return authHeader?.split(' ')[1] || null;
    }
}