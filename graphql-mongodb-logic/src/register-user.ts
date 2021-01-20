
import {models} from 'graphql-mongodb-data'
import {errors,utils} from 'graphql-mongodb-commons'
const {User} = models;
const {Email,String} = utils;
const {DuplicityError} = errors;

import bcryptjs from 'bcryptjs';

interface IRegisterUser {
    name:string,
    email:string,
    password:string
}

export const registerUser =({name, email,password}:IRegisterUser )=>{
    String.notVoid(name)
    String.notVoid(email)
    String.notVoid(password)
    String.validatePassword(password)
    Email.validate(email)

    return (async ()=>{
        const user = await User.findOne({email})
        const encryptPassword =  await bcryptjs.hash(password,10);
        if(user) throw new DuplicityError (`User with ${email} already exist!`)

        return await User.create({name,email,password:encryptPassword});
    })()
}