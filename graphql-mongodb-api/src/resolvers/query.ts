
import { getUsers,getUser } from 'graphql-mongodb-logic';
import { IResolvers} from "graphql-tools";
import{verify} from'jsonwebtoken';
import 'dotenv/config'
const SECRET = process.env.SECRET

console.log(SECRET)
export const query : IResolvers= {
    Query : {
        getUsers: async() =>{ 
            return await getUsers()
        },
        getUser: async(_:void,{token}:any)=>{
          const {id:userId} :any = await verify(token,SECRET||'',(err:any,decoded:any)=>{
               if(err) throw Error('Invalid token!')
               return decoded;
           })
           return await getUser(userId)

        }
    }
}