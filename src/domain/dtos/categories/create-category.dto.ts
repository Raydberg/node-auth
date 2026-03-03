export class CreateCategoryDto {
    private constructor(
        public readonly name: string,
        private readonly available: boolean
    ) { }

    static create(opt: { [key: string]: any }): [(string | undefined)?, CreateCategoryDto?] {

        const { name, available = false } = opt
        let availableBoolean = available;
        if (!name) return ["Missing name"];
        if (typeof available !== 'boolean') {
            availableBoolean = (available === 'true')// true
        }
        return [undefined, new CreateCategoryDto(name, availableBoolean)]
    }

}