import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{type:String,required:true,unique:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,lrequired:true,unique:true},
        isAdmin:{type:Boolean,default:false}
    },
    {
        timestamps:true
    }
)

const User = mongoose.model("Users",userSchema);

export default User;