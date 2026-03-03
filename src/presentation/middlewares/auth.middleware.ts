import { Jwt } from '@config/jwt';
import { UserModel } from '@data/mongo/models/user.model';
import { UserEntity } from '@domain/entities/user.entity';
import { Request, Response, NextFunction } from 'express'

export class AuthMiddleware {

    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header("Authorization")
        if (!authorization) return res.status(401).json({ error: "No token provider" });
        if (!authorization.startsWith("Bearer ")) return res.status(401).json({ error: "Invalid bearer token" });
        const token = authorization.split(" ").at(1) || ""

        try {
            const payload = await Jwt.validateToken<{ id: string }>(token)
            if (!payload) return res.status(401).json({ error: "Invalid token" });
            const user = await UserModel.findById(payload.id)
            if (!user) return res.status(401).json({ error: "User not found" });
            const authUser = UserEntity.fromObjet(user);
            res.locals.user = authUser;
            //Proceder con el siguiente middleware
            next();
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Internal server error" })
        }
    }
}