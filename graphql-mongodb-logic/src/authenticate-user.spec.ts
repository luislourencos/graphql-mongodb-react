import 'dotenv/config';
import {expect} from 'chai';
import {utils,errors} from 'graphql-mongodb-commons';
import {mongoose,models} from 'graphql-mongodb-data';
import {authenticateUser} from './authenticate-user'
import bcryptjs from 'bcryptjs'
const MONGO_URL = process.env.MONGODB_URL
const {User} =models;
const {random} = Math;
const {FormatError} = errors

describe('authenticateUser',()=>{
    before(async()=> await mongoose.connect(MONGO_URL ||''))

    let name:string,email:string,password:string, encryptPassword:string,userId:string;

    beforeEach(async()=>{
        await User.deleteMany();
        name = `name-${random()}`;
        email = `email-${random()}@mail.com`;
        password = `password${random().toString().replace('.','')}`;
        encryptPassword = await bcryptjs.hash(password,10);
        const user = await User.create({name,email,password:encryptPassword})
        userId = user.id
    })

    it('should success to authenticate user',async()=>{
        const result = await authenticateUser({email,password});
        expect(result).to.exist
        expect (result).to.equal(userId) 
    })
    it('should faild to authenticate a diferent user',async()=>{
        const _email = `email-${random()}@mail.com`
        try {
            await authenticateUser({email:_email,password});
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`This email: ${_email} is not register!`)
        }
       
    })
    it('should faild to authenticate a worng password',async()=>{
        const _password = `password${random().toString().replace('.','')}`
        try {
            await authenticateUser({email,password:_password});
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`Wrong password!`)
        }
    })

    it('Validate fields sync tests',()=>{
        const _password = '123'
        expect(()=>{
            authenticateUser({email,password:_password});
        }).to.throw(FormatError,'Need to have letter, numbers and at least 5 caracters!')

        const _email = `${random()}`
        expect(()=>{
            authenticateUser({email:_email,password});
        }).to.throw(FormatError,`${_email} is not an e-mail`)
    })

    afterEach(async ()=>await User.deleteMany())
    after(async()=> await mongoose.disconnect())
})