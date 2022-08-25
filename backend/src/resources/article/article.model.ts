import { Schema, model } from "mongoose";
import Article from '@/resources/article/article.interface';

const ArticleSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        desc: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: false
        },
        categories: {
            type: Array,
            required: false
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {timestamps: true}
);

export default model<Article>('ArticleModel', ArticleSchema)