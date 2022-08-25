import ArticleModel from "@/resources/article/article.model";
import Article from "@/resources/article/article.interface";

class ArticleService {
  private article = ArticleModel;

  // @desc creates a new article
  // access Private
  // route POST /api/article
  public async create(
    title: string,
    desc: string,
    photo: string,
    categories: Array<string>,
    author: string
  ): Promise<Article> {
    try {
        const article = await this.article.create({title, desc, photo, categories, author});
        return article;
    } catch (e) {
        throw new Error('Unable to create article')
    }
  }
}

export default ArticleService
