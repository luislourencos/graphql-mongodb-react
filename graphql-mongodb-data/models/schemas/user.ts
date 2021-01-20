import {Schema}  from 'mongoose'


export default new Schema({
    name:{
        type:String,
        require:true
    },
    email :{
        type:String,
        require:true,
        unique:true
    },
    password :{
        type:String,
        require :true
    }
})
