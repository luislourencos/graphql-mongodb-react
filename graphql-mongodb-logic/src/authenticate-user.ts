import {errors,utils} from 'graphql-mongodb-commons';
import {models} from 'graphql-mongodb-data';
import bcryptjs from 'bcryptjs'
const {User} = models;
const {String,Email} = utils;
const {UnexistenceError,CredentialsError } = errors

 


export const authenticateUser =({email,password}:any)=>{
    String.notVoid(email)
    String.notVoid(password);
    String.validatePassword(password);
    Email.validate(email);

    return (async()=>{
        const user :any = await User.findOne({email})

        if(!user) throw new UnexistenceError(`This email: ${email} is not register!`)

        const match = await bcryptjs.compare(password,user.password);

        if(!match) throw new CredentialsError(`Wrong password!`);
        
        return user.id
    }) ()
}