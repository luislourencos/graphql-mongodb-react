import cors from 'cors';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {schema} from './schema'
import {isAuth} from './middleware/isAuth'

import 'dotenv/config'
import {mongoose} from 'graphql-mongodb-data';

const {env:{PORT = 5000,MONGODB_URL = ''}} = process;
const app = express();

const server  = new ApolloServer({
    schema,
    context: ({req}:any) => ({
        req:req
      }),
    introspection:true
})

console.info('Conecting with database...');
mongoose.connect(MONGODB_URL)
.then(()=>{
    console.info('Conected with data base!!!');
    app.use(cors());
    app.use(isAuth);

    server.applyMiddleware({app});

    app.listen(PORT,()=>{
        console.log(`Server conected!! at port http://localhost${PORT}${server.graphqlPath}`)
    })

})
.catch((error:any)=>{
    console.error('Problem connecting with dataBase!', error.message)
})



