import mongoose from 'mongoose';
const {Types:{ObjectId},connect,disconnect} = mongoose

export default {
    connect(url:string){
        return connect(url,{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true ,useFindAndModify: false })
    },
    disconnect,
    ObjectId
}


