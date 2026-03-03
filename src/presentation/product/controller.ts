import { CreateProductDto } from "@domain/dtos/products/create-product.dto";
import { PaginationDto } from "@domain/dtos/shared/paginate.dto";
import { CustomError } from "@domain/errors/custom.error";
import { ProductService } from "@presentation/services/product.service";

import { Response, Request } from 'express'
export class ProductController {
    constructor(private readonly productService: ProductService) { }


    private handlerError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message });
        return res.status(500).json(`${error}`)
    }

    getProducts = async (req: Request, res: Response) => {
        const { page = 1, limit = 10 } = req.query

        const [error, paginationDto] = PaginationDto.create(+page, +limit)
        if (error) throw res.status(400).json({ error })
        this.productService.getProducts(paginationDto!)
            .then(category => res.status(200).json(category))
            .catch(error => this.handlerError(error, res))
    }

    createProduct = async (req: Request, res: Response) => {
        const [error, dto] = CreateProductDto.create({ ...req.body, user: res.locals.user })
        if (error) return res.status(400).json({ error });
        this.productService.createProduct(dto!)
            .then(product => res.status(200).json({ product }))
            .catch(error => this.handlerError(error, res))

    }
}