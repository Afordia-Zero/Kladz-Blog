import { Schema, model } from "mongoose";
import Category from '@/resources/category/category.interface';

const ArticleSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        articles: [
            {
              type: Schema.Types.ObjectId,
              ref: "ArticleModel"
            }
          ]
    },
    {timestamps: true}
);

export default model<Category>('CategoryModel', ArticleSchema)