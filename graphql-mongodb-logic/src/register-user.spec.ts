import { errors } from 'graphql-mongodb-commons';
//@ts-nocheck
import {registerUser} from './register-user';
import bcryptjs from 'bcryptjs';
import {expect} from 'chai';
import {mongoose, models} from 'graphql-mongodb-data';
import 'dotenv/config';
const {FormatError,VoidError} = errors
const {random} = Math;


const MONGODB_URL = process.env.MONGODB_URL || '';
const User = models.User;

describe('registerUser' ,()=>{
    before(async()=> await mongoose.connect(MONGODB_URL))

    let name:string,email:string,password:string, match:boolean; 

    beforeEach (async()=>{
        await User.deleteMany();
        name = `name-${random()}`;
        email = `email-${random()}@mail.com`; 
        password = `password${random().toString().replace('.','')}`;
    })


        it('Sould success register one user', async()=>{
            await registerUser({name,email,password});
            const  [result] :any = await User.find({email});
            expect(result).to.exist
            expect(result.name).to.equal(name)
            expect(result.email).to.equal(email)
            match  = await bcryptjs.compare(password,result.password)
            expect(match).to.be.true;
        })
 
  
    describe('register an existent user', ()=>{
        beforeEach(async()=> await User.create({name,email,password}));

        it('Sould faild to',async()=>{
            try {
                await registerUser({name,email,password});
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`User with ${email} already exist!`)
            }
        })
     
    })

   
        it('Validate fields sync tests',()=>{
            expect(()=>{
                registerUser({name,email,password:`1234`})
            }).to.throw(Error,'Need to have letter, numbers and at least 5 caracters!')
    
            let _email = `${random()}`
            expect(()=>{
                registerUser({name,email:_email,password})
            }).to.throw(FormatError,`${_email} is not an e-mail`)
      
            let _name = ''
            expect(()=>{
                registerUser({name:_name,email,password})
            }).to.throw(VoidError,`string is empty or blank`)
        })


    afterEach(async ()=>await User.deleteMany())
    after(async ()=> await mongoose.disconnect())
  
})








