import { Document } from "mongoose";

export default interface Article extends Document{
    name: string,
    articles: Array<string>
}