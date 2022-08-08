import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{type:String, required:true, unique:true},
        slug:{type:String, required:true, unique:true},
        image:{
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        },
        brand:{type:String, required:true},
        category:{type:String, required:true},
        description:{type:String, required:true},
        price:{type:Number, requred:true},
        countInStock:{type:Number, requred:true},
        rating:{type:Number, requred:true},
        numReviews:{type:Number, requred:true},
    },
    {
        timestamps:true
    }
)

const Product = mongoose.model("Product",productSchema);

export default Product;