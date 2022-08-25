import { Document } from "mongoose";

export default interface Article extends Document{
    title: string,
    desc: string,
    photo: string,
    categories: Array<Object>
    author: string
}