import { bcryptAdapter } from "@config/bcrypt";
import { Jwt } from "@config/jwt";
import { UserModel } from "@data/mongo/models/user.model";
import { LoginUserDto } from "@domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "@domain/dtos/auth/register-user.dto";
import { UserEntity } from "@domain/entities/user.entity";
import { CustomError } from "@domain/errors/custom.error";
import { EmailService, SendMailOptions } from "./email.service";
import { envs } from "@config/envs";


export class AuthService {

    constructor(
        private readonly emailService: EmailService
    ) { }

    async registerUser(registerUserDto: RegisterUserDto) {
        const existUser = await UserModel.findOne({ email: registerUserDto.email })
        if (existUser) throw CustomError.badRequest("Email already exist");
        try {
            const user = new UserModel(registerUserDto)
            //Encriptar password
            user.password = bcryptAdapter.hash(registerUserDto.password)
            await user.save()

            //Email confirmacion
            await this.sendEmailValidationLink(user.email!)

            const { password, ...rest } = UserEntity.fromObjet(user)
            const token = await Jwt.generateToken({ id: user.id })
            return {
                ...rest,
                token
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async loginUser(loginUserDto: LoginUserDto) {
        const existUser = await UserModel.findOne({ email: loginUserDto.email })
        if (!existUser) throw CustomError.badRequest("Invalid Credentials");
        const isMatch = bcryptAdapter.compare(loginUserDto.password, existUser.password!);
        console.log(isMatch)
        if (!isMatch) throw CustomError.badRequest("Password not match")

        const { password, ...user } = UserEntity.fromObjet(existUser)
        const token = await Jwt.generateToken({ id: user.id })
        if (!token) throw CustomError.internalServer("Error while creating jwt");

        return {
            ...user,
            token
        }
    }

    private sendEmailValidationLink = async (email: string) => {
        const token = await Jwt.generateToken({ email });
        if (!token) throw CustomError.internalServer("Error getting doing");

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
        const html = `
            <h1>Validate your email</h1>
            <p>Click on the following link to validate your email</p>
            <a href="${link}">Validate your email : ${email} </a>
            `;

        const options: SendMailOptions = {
            to: email,
            subject: "Validate your email",
            htmlBody: html
        }
        const isSend = await this.emailService.sendEmail(options)
        if (!isSend) throw CustomError.internalServer("Error sending email");

    }

}