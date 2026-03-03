import { ProductModel } from "@data/mongo/models/product.model";
import { CreateProductDto } from "@domain/dtos/products/create-product.dto";
import { PaginationDto } from "@domain/dtos/shared/paginate.dto";
import { CustomError } from "@domain/errors/custom.error";

export class ProductService {

    async getProducts(paginationDto: PaginationDto) {
        // const categories = await CategoryModel.find()
        const { page, limit } = paginationDto
        try {
            const [total, products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .populate(`user`, "name email")
                    .populate(`category`)
            ])
            return {
                page,
                limit,
                total,
                products
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async createProduct(createProductDto: CreateProductDto) {
        const productExist = await ProductModel.findOne({ name: createProductDto.name })
        if (productExist) throw CustomError.badRequest("Product all ready exist");
        // console.log(user)
        try {
            const product = new ProductModel({ productExist })
            await product.save()
            return product
        } catch (error) {
            console.error(error)
            throw CustomError.internalServer(`${error}`)
        }
    }

}