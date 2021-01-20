import { authenticateUser } from 'graphql-mongodb-logic';
import { IResolvers } from "graphql-tools";
import { registerUser } from "graphql-mongodb-logic";
import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config'
const jwt = jsonwebtoken
const SECRET = process.env.SECRET

export const mutation :IResolvers ={
    Mutation : {
        async registerUser (_:void, {user}) {
            return registerUser(user)
        },
        async authenticateUser (_:void,{userAuthenticate}){
            try {
            const result = await authenticateUser(userAuthenticate);
            const token = jwt.sign({id:result},SECRET||'secret',{ expiresIn: '1d' })
            return {
                token
            }
                
            } catch (error) {
                throw new Error(error.message)
            }
               
        }
    }
}