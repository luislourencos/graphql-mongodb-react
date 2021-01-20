import { getUsers } from './get-users';
import 'dotenv/config';
const MONGODB_URL = process.env.MONGODB_URL
import {expect} from 'chai';
import {models, mongoose} from 'graphql-mongodb-data';
import {errors} from 'graphql-mongodb-commons';
import bcryptjs from 'bcryptjs'
const {User} = models;
const {random } = Math;

describe.only('getUsers',()=>{
    before(async()=>await mongoose.connect(MONGODB_URL||''));

    let name:string,email:string,password:string,hash:string,usersCreated:any;
    beforeEach(async()=>{
        await User.deleteMany()
        let data = [] as any;
        for (let i = 0 ; i<1 ; i++ ) {
            name = `name-${random()}`;
            email = `email-${random()}@mail.com`;
            password = `password${random().toString().replace('.','')}`;
            hash = await bcryptjs.hash(password,10);
            data.push({name,email,password:hash})
        }
       
        usersCreated = await User.insertMany(data)   
    })

    it('Sloud sucess to find data',async ()=>{
        const users = await getUsers()

        expect(users).to.exist
        expect(users.length).to.greaterThan(0)
        users.map((user:any)=>{
            usersCreated.map((userCreated:any)=>{
                expect(user.name).to.equal(userCreated.name)
                expect(user.email).to.equal(userCreated.email)
            })
        })
    })

    it('Sloud find a empty array', async()=>{
        await User.deleteMany()
        const users = await getUsers()
        expect(users).to.exist
        expect(users.length).to.equals(0)
    })

    afterEach(async()=> await User.deleteMany())


    after(async()=>await mongoose.disconnect())
})
