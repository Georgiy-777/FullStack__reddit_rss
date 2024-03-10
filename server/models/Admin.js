/* This code snippet is defining a Mongoose schema for an Admin model in a Node.js application. Here's
a breakdown of what each part is doing: */
const{Schema,model}=require('mongoose');
const AdminSchema=new Schema({
    nickname:{
        type:String, required:true, unique:true
    },

    password:{
        type:String, required:true
    }
})
module.exports=model('Admin',AdminSchema)