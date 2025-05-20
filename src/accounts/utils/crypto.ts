import * as crypto from 'crypto';
import { ENVS } from '@common/config/envs';

const algorithm   = 'aes-256-cbc';
const key         = ENVS.PASSWORD_SECRET_KEY.padEnd( 32 ).substring( 0, 32 ); // 32 bytes


const encryptPassword = ( password: string ): string => {
    const iv          = crypto.randomBytes( 16 ); // 16 bytes aleatorios
    const cipher      = crypto.createCipheriv( algorithm, key, iv );
    const encrypted   = Buffer.concat([
        cipher.update( password, 'utf8' ),
        cipher.final()
    ]);

    const encryptedHex = encrypted.toString( 'hex' );
    const ivHex        = iv.toString( 'hex' );
    
    return `${ivHex}:${encryptedHex}`;
};


const decryptPassword = ( encryptedWithIv: string ): string => {
    const [ ivHex, encryptedHex ] = encryptedWithIv.split( ':' );
    
    if ( !ivHex || !encryptedHex ) {
        throw new Error( 'Encrypted string is not correctly formatted.' );
    }

    const iv        = Buffer.from( ivHex, 'hex' );
    const encrypted = Buffer.from( encryptedHex, 'hex' );
    const decipher  = crypto.createDecipheriv( algorithm, key, iv );
    
    const decrypted = Buffer.concat([
        decipher.update( encrypted ),
        decipher.final()
    ]);

    return decrypted.toString( 'utf8' );
};


export {
    encryptPassword,
    decryptPassword
};
