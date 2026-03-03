import { CreateCategoryDto } from "@domain/dtos/categories/create-category.dto";
import { CustomError } from "@domain/errors/custom.error";
import { CategoryService } from "@presentation/services/category.service";

import { Response, Request } from 'express'
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }


    private handlerError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message });
        return res.status(500).json(`${error}`)
    }

    getCategories = async (req: Request, res: Response) => {
        this.categoryService.getCategories()
            .then(category => res.status(200).json(category))
            .catch(error => this.handlerError(error, res))
    }

    createCategory = async (req: Request, res: Response) => {
        const user = res.locals.user;
        if (!user) return res.status(401).json({ error: 'Unauthorized' });

        const [error, dto] = CreateCategoryDto.create(req.body)
        // console.log(dto)
        if (error) return res.status(400).json({ error });
        this.categoryService.createCategory(dto!, user)
            .then((category) => res.status(201).json(category))
            .catch(error => this.handlerError(error, res))
    }
}