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

    }

    createProduct = async (req: Request, res: Response) => {

    }
}