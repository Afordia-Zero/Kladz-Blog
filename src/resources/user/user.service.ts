import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';

class UserService {
    private user = UserModel

    // @desc creates a new user
    // access Public
    // route POST /api/users

    public async register(
        name: string,
        email: string,
        password: string,
        profilePic: string,
    ): Promise<string | Error>{
        try {
            const user = await this.user.create({name, email, password, profilePic})

            const accessToken = token.createToken(user);
            return accessToken;
        } catch (error) {
            throw new Error('Unable to create user')
        }
    }

    // @desc login user
    // access Public
    // route POST /api/user/login
    public async login(
        email: string,
        password: string
    ): Promise<string | Error>{
        try {
            const user = await this.user.findOne({email});

            if(!user){
                throw new Error('Unable to find user with that Email Address')
            }

            if(await user.isValidPassword(password)){
                return token.createToken(user);
            }else{
                throw new Error('Wrong credentials given');
            }
        } catch (error) {
            throw new Error('Unable to login user')
        }
    }
}
export default UserService