import ArticleModel from "@/resources/article/article.model";
import Article from "@/resources/article/article.interface";
import UserModel from "../user/user.model";

class ArticleService {
  private article = ArticleModel;
  private user = UserModel;


  public async get ():Promise<Article[]> {
    const articles = await this.article.find()
    return articles
  }

  // @desc creates a new article
  // access Private
  // route POST /api/article
  public async create(
    title: string,
    desc: string,
    photo: string,
    categories: Array<string>,
    author: Number
  ): Promise<Article> {
    try {
        const article = await this.article.create({title, desc, photo, categories, author});
        return article;
    } catch (e) {
        throw new Error('Unable to create article')
    }
  }
  // @desc updates an article
  // access Private
  // route PUT /api/article
  public async update(articleId: string, userId: string, update:Object): Promise<Article | null> {

    try {
        const article = await this.article.findById(articleId);
        if(!article){
          throw new Error('Article does not exist')
      }
        const user = await this.user.findById(userId)
        if(!user){
          throw new Error('User not found')
      }
        if(article.author.toString() !== user.id){
          throw new Error('User not authorized')
        }
        const updatedArticle = await this.article.findByIdAndUpdate(articleId, update, {new: true})
        return updatedArticle;
    } catch (e) {
        throw new Error('Unable to update article')
    }
  }
  // @desc creates a new article
  // access Private
  // route POST /api/article
  public async delete(
    articleId: string
  ): Promise<string | null> {
    try {
        const article = await this.article.findById(articleId);
        if(!article){
          throw new Error('Article does not exist')
      }
        await this.article.remove();
        return articleId;
    } catch (e) {
        throw new Error('Unable to delete article')
    }
  }
 }

export default ArticleService
