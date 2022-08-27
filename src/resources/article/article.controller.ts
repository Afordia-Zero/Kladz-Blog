import {Router, Request, Response, NextFunction} from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/article/article.validation';
import ArticleService from './article.service';
import authenticated from '@/middleware/authenticated.middleware';

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
            const articles = await this.ArticleService.get();
            res.status(200).json({articles})
        }catch(e){
            next(new HttpException(404, "Cannot get articles"))
        }
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> =>{
        try{
            const {title, desc, photo, categories} = req.body
            const author = req.user.id
            const article = await this.ArticleService.create(title, desc, photo, categories, author);
            res.status(201).json({article})
        }catch(e:any){
            next(new HttpException(400, e.message))
        }
    }

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> =>{
        try{
            const update = req.body
            const articleId = req.params.id;
            const userId = req.params.user;
            const article = await this.ArticleService.update(articleId,userId,update);
            res.status(201).json({article})
        }catch(e){
            next(new HttpException(400, "Cannot update article"))
        }
    }

    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> =>{
        try{
            const articleId = req.params.id;
            await this.ArticleService.delete(articleId);
        }catch(e){
            next(new HttpException(400, "Cannot delete article"))
        }
    }
}

export default ArticleController;