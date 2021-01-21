
import { getUsers,getUser } from 'graphql-mongodb-logic';
import { IResolvers} from "graphql-tools";
import 'dotenv/config'

export const query : IResolvers= {
    Query : {
        getUsers: async() =>{ 
            return await getUsers()
        },
        getUser: async(_:void,__:void,{req}:any)=>{

        if(!req.isAuth){
             throw new Error('Authenication failed!!')
         }
         return await getUser(req.userId)
        }
    }
}