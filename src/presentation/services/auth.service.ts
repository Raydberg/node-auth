import { UserModel } from "@data/mongo/models/user.model";
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
            await user.save()
            //Encriptar password

            //JWT

            //Email confirmacion

            const { password, ...rest } = UserEntity.fromObjet(user)
            // console.log(useEntity)
            return {
                ...rest,
                token: "ABC"
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }


}