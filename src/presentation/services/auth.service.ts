import { bcryptAdapter } from "@config/bcrypt";
import { Jwt } from "@config/jwt";
import { UserModel } from "@data/mongo/models/user.model";
import { LoginUserDto } from "@domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "@domain/dtos/auth/register-user.dto";
import { UserEntity } from "@domain/entities/user.entity";
import { CustomError } from "@domain/errors/custom.error";

export class AuthService {

    constructor() { }

    async registerUser(registerUserDto: RegisterUserDto) {
        const existUser = await UserModel.findOne({ email: registerUserDto.email })
        if (existUser) throw CustomError.badRequest("Email already exist");
        try {
            const user = new UserModel(registerUserDto)
            //Encriptar password
            user.password = bcryptAdapter.hash(registerUserDto.password)
            //JWT

            //Email confirmacion

            await user.save()

            const { password, ...rest } = UserEntity.fromObjet(user)
            return {
                ...rest,
                token: "ABC"
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
        const token = await Jwt.generateToken({ id: user.id,email:user.email })
        if (!token) throw CustomError.internalServer("Error while creating jwt");

        return {
            ...user,
            token
        }
    }


}