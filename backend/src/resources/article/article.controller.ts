import {Router, Request, Response, NextFunction} from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/article/article.validation';
import ArticleService from './article.service';

class ArticleController implements Controller{
    public path = '/articles';
    public router = Router();
    private ArticleService = new ArticleService();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(): void{
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        )
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> =>{
        try{
            const {title, desc, photo, categories, author} = req.body
            const article = await this.ArticleService.create(title, desc, photo, categories, author);
            res.status(201).json({article})
        }catch(e){
            next(new HttpException(400, "Cannot create post"))
        }
    }
}

export default ArticleController;