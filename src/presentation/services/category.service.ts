import { CategoryModel } from "@data/mongo/models/category.model";
import { CreateCategoryDto } from "@domain/dtos/categories/create-category.dto";
import { PaginationDto } from "@domain/dtos/shared/paginate.dto";
import { UserEntity } from "@domain/entities/user.entity";
import { CustomError } from "@domain/errors/custom.error";

export class CategoryService {

    async getCategories(paginationDto: PaginationDto) {
        // const categories = await CategoryModel.find()
        const { page, limit } = paginationDto
        try {
            const [total, categories] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .select('_id name available')
                    .lean()
            ])
            // const total = await CategoryModel.countDocuments()
            // const categories = (
            //     await CategoryModel.find()
            //         .skip((page - 1) * limit)
            //         .limit(limit)
            //         .select('_id name available')
            //         .lean()
            // ).map(({ _id, name, available }) => ({ id: _id, name, available }))            
            // return categories.map(({ id, name, available }) => ({ id, name, available }))

            const mappedCategories = categories.map(({ _id, name, available }) => ({
                id: _id.toString(),
                name,
                available,
            }))

            return {
                page,
                limit,
                total,
                categories: mappedCategories,
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
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