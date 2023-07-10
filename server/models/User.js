const mongoose =require('mongoose');

const UserSchema =new mongoose.Schema({
    username:{type:String,required:true,min:8,unique:true},
    password:{type:String,required:true}
});

const UserModel =mongoose.model('User',UserSchema);

module.exports=UserModel;