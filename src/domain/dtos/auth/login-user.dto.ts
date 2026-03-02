import { regularExps } from "@config/regular-exp";

export class LoginUserDto {
    constructor(
        public readonly email: string,
        public readonly password: string
    ) { }


    static create(options: { [key: string]: any }): [(string | undefined)?, LoginUserDto?] {
        const { email, password } = options

        if (!email) return ["Missing email"];
        if (!regularExps.email.test(email)) return ["Email not valid"]
        if (!password) return ["Missing passord"];
        if (password.length < 6) return ["Password too short"];

        return [undefined, new LoginUserDto(email, password)]
    }


}