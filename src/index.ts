import "dotenv/config";
import "module-alias/register";
import validateEnv from "@/utils/validateEnv";
import App from "./app";
import ArticleController from "@/resources/article/article.controller";
import UserController from "@/resources/user/user.controller";
import CategoryController from "./resources/category/category.controller";

validateEnv();

const app = new App(
  [new ArticleController(), new UserController(), new CategoryController],
  Number(process.env.PORT)
);

app.listen();
