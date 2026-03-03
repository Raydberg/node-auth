import { isMongoId } from "@config/validatos";

export class CreateProductDto {
    private constructor(
        public readonly name: string,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string,
        public readonly category: string,
        public readonly isAvailable?: boolean
    ) { }


    static create(obj: { [key: string]: any }): [(string | undefined)?, CreateProductDto?] {

        const { name, isAvailable, price, description, user, category } = obj
        let availableBool = isAvailable
        if (!name) return ["Missin name"];

        if (!user) return ["Missin user"];
        if (isMongoId(user)) return ["Invalid User Id"];
        if (!category) return ["Missin category"];
        if (isMongoId(category)) return ["Category User Id"];

        if (typeof availableBool !== 'boolean') {
            availableBool = (availableBool === 'true')
        }
        
        return [undefined, new CreateProductDto(
            name,
            price,
            description,
            user,
            category,
            isAvailable
            // !!isAvailable //Hacemos la validacion aqui , si no quermeos usar el if
            // ya que si viene un string lo tomamos como true 
        )]
    }
}