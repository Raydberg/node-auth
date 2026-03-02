import jwt, { SignOptions } from 'jsonwebtoken'
import { envs } from './envs';
//funcion o clase lo mismo


const JWT_SEED = envs.JWT_SEED


export class Jwt {

    static generateToken(
        payload: any,
        duration: NonNullable<SignOptions["expiresIn"]> = "2h"
    ): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            jwt.sign(
                payload,
                JWT_SEED,
                { expiresIn: duration },
                (err, token) => {
                    if (err || !token) return reject(err);
                    resolve(token);
                }
            );
        });
    }

    static validateToken = (token: string): Promise<unknown> => {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null)
                resolve(decoded)
            })
        })

    }

}