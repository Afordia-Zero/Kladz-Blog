import { Schema, model } from "mongoose";
import Article from '@/resources/article/article.interface';

const ArticleSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: false
        },
        categories: [
            {
              type: Schema.Types.ObjectId,
              ref: "CategoryModel"
            }
          ],
        author: {
            type: Schema.Types.ObjectId,
            ref: 'UserModel'
        }
    },
    {timestamps: true}
);

export default model<Article>('ArticleModel', ArticleSchema)