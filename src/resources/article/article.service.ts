import ArticleModel from "@/resources/article/article.model";
import Article from "@/resources/article/article.interface";
import UserModel from "../user/user.model";
import { Schema } from "mongoose";

class ArticleService {
  private article = ArticleModel;
  private user = UserModel;

  public async get(): Promise<Article[]> {
    const articles = await this.article.find();
    return articles;
  }

  // @desc creates a new article
  // access Private
  // route POST /api/article
  public async create(
    title: string,
    desc: string,
    photo: string,
    categories: Array<string>,
    author: string | Schema.Types.ObjectId
  ): Promise<Article> {
    try {
      const article = await this.article.create({
        title,
        desc,
        photo,
        categories,
        author,
      });
      return article;
    } catch (e) {
      throw e;
    }
  }
  // @desc updates an article
  // access Private
  // route PUT /api/article
  public async update(
    articleId: string,
    userId: string,
    update: Object
  ): Promise<Article | null> {
    try {
      const article = await this.article.findById(articleId).select("author");
      if (!article) {
        throw new Error("Article does not exist");
      }
      console.log(typeof userId);

      if (article.author.toString() !== userId.toString()) {
        throw new Error("User not authorized");
      }
      const updatedArticle = await this.article.findByIdAndUpdate(
        articleId,
        update,
        { new: true }
      );
      return updatedArticle;
    } catch (e) {
      throw e;
    }
  }
  // @desc creates a new article
  // access Private
  // route POST /api/article
  public async delete(articleId: string): Promise<string | null> {
    try {
      const article = await this.article.findByIdAndRemove(articleId);
      if (!article) {
        throw new Error("Article does not exist");
      }
      return articleId;
    } catch (e) {
      throw e;
    }
  }
}

export default ArticleService;
