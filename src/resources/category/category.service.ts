import CategoryModel from "@/resources/category/category.model";
import Category from "@/resources/category/category.interface";

class ArticleService {
  private category = CategoryModel;


  public async get ():Promise<Category[]> {
    const categories = await this.category.find()
    return categories
  }

  // @desc creates a new category
  // access Private
  // route POST /api/categories
  public async create(
    name: string
  ): Promise<Category> {
    try {
        const category = await this.category.create({name});
        return category;
    } catch (e) {
        throw new Error('Unable to create category')
    }
  }
  // @desc updates a category
  // access Private
  // route PUT /api/article
  public async update(categoryId: string, update:Object): Promise<Category | null> {

    try {
        const category = await this.category.findById(categoryId);
        if(!category){
          throw new Error('Category does not exist')
      }
        const updatedCategory = await this.category.findByIdAndUpdate(categoryId, update, {new: true})
        return updatedCategory;
    } catch (e) {
        throw new Error('Unable to update category')
    }
  }
  // @desc creates a new article
  // access Private
  // route POST /api/article
  public async delete(
    categoryId: string
  ): Promise<string | null> {
    try {
        const category = await this.category.findById(categoryId);
        if(!category){
          throw new Error('Category does not exist')
      }
        await this.category.remove();
        return categoryId;
    } catch (e) {
        throw new Error('Unable to delete article')
    }
  }
 }

export default ArticleService
