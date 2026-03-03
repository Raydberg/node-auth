import { CategoryModel } from "@data/mongo/models/category.model";
import { CreateCategoryDto } from "@domain/dtos/categories/create-category.dto";
import { UserEntity } from "@domain/entities/user.entity";
import { CustomError } from "@domain/errors/custom.error";

export class CategoryService {

    async getCategories() {
        // const categories = await CategoryModel.find()
        try {
            return (await CategoryModel.find().select('_id name available').lean()).map(({ _id, name, available }) => ({ id: _id, name, available }))            // return categories.map(({ id, name, available }) => ({ id, name, available }))
        } catch (error) {
            throw CustomError.internalServer
        }
    }

    async createCategory(createCategory: CreateCategoryDto, user: UserEntity) {
        const category = await CategoryModel.findOne({ name: createCategory.name })
        if (category) throw CustomError.badRequest("Category all ready exist");
        // console.log(user)
        try {

            const newCategory = new CategoryModel({
                ...createCategory,
                user: user.id
            })

            await newCategory.save()

            return {
                id: newCategory.id,
                name: newCategory.name,
                available: newCategory.available
            }

        } catch (error) {
            console.error(error)
            throw CustomError.internalServer(`${error}`)
        }
    }




}