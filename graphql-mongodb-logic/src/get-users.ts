import {models} from 'graphql-mongodb-data';
const {User} = models;


export const getUsers = async()=>{
    const users = await User.find({})

    if(users.length===0) {
        return []
    }
    const _users = users.map(({id,name,email}:any)=>{
        return {
            id,
            name,
            email
        }
    })
    return _users 
}