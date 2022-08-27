import {Router, Request, Response, NextFunction} from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/category/category.validation';
import CategoryService from './category.service';
import authenticated from '@/middleware/authenticated.middleware';

class CategoryController implements Controller{
    public path = '/categories';
    public router = Router();
    private CategoryService = new CategoryService();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(): void{
        this.router.post(
            `${this.path}`,
            authenticated,
            validationMiddleware(validate.create),
            this.create
        ),
        this.router.get(
            `${this.path}`,
            this.get
        ),
        this.router.put(
            `${this.path}/:id`,
            authenticated,
            validationMiddleware(validate.update),
            this.update
        ),
        this.router.delete(
            `${this.path}/:id`,
            authenticated,
            this.delete
        )
    }

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> =>{
        try{
            const categories = await this.CategoryService.get();
            res.status(200).json({categories})
        }catch(e){
            next(new HttpException(404, "Cannot get categories"))
        }
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> =>{
        try{
            const {name} = req.body
            const category = await this.CategoryService.create(name);
            res.status(201).json({category})
        }catch(e){
            next(new HttpException(400, "Cannot create category"))
        }
    }

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> =>{
        try{
            const update = req.body
            const categoryId = req.params.id;
            const category = await this.CategoryService.update(categoryId,update);
            res.status(201).json({category})
        }catch(e){
            next(new HttpException(400, "Cannot update category"))
        }
    }

    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> =>{
        try{
            const categoryId = req.params.id;
            await this.CategoryService.delete(categoryId);
        }catch(e){
            next(new HttpException(400, "Cannot delete category"))
        }
    }
}

export default CategoryController;