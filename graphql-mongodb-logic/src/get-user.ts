import {models,mongoose} from 'graphql-mongodb-data'
import {utils} from 'graphql-mongodb-commons' 
const {User} = models
const {ObjectId} = mongoose
const {String} = utils

export const getUser =(userId :string)=>{
    String.notVoid(userId)
  
    return (async()=>{
        
        const user = await User.findById({_id:ObjectId(userId)})
        if(!user) throw new Error ('User don`t finded!')
        return user
    })()
} 