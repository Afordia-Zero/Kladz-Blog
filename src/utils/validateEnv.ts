import { cleanEnv, str, port } from "envalid";

function validateEnv():void{
    cleanEnv(process.env, {
        NODE_ENV:str({
            choices: ['development', 'production']
        }),
        MONGO_URI: str(),
        JWT_SECRET: str()
    })
}

export default validateEnv