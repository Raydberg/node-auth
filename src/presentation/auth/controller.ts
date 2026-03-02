import { LoginUserDto } from '@domain/dtos/auth/login-user.dto'
import { RegisterUserDto } from '@domain/dtos/auth/register-user.dto'
import { CustomError } from '@domain/errors/custom.error'
import { AuthService } from '@presentation/services/auth.service'
import { Response, Request } from 'express'
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    private handlerError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message });
        return res.status(500).json(`${error}`)
    }

    register = (req: Request, res: Response) => {
        const [error, dto] = RegisterUserDto.create(req.body)
        if (error) return res.status(400).json(error)

        this.authService.registerUser(dto!)
            .then(user => res.json(user))
            .catch(error => this.handlerError(error, res))
    }

    login = (req: Request, res: Response) => {
        const [error, dto] = LoginUserDto.create(req.body)
        if (error) return res.status(400).json({ error });
        this.authService.loginUser(dto!)
            .then(user => res.json(user))
            .catch(error => this.handlerError(error, res))
    }

    validateEmail = (req: Request, res: Response) => {

    }


} 
