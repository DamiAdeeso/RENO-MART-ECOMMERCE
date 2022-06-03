import express from "express";
import User from "../models/userModel.js";
import { isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler"
import Order from "../models/orderModel.js";
const orderRouter = express.Router();

orderRouter.post("/",isAuth,expressAsyncHandler(async(req,res)=>{
    console.log(req.headers.authorization);
    const newOrder = new Order({
        orderItems:req.body.orderItems.map((x)=>({
            ...x,product:x._id    
        })),
        shippingAddress:req.body.shippingAddress,
        paymentMethod:req.body.PaymentMethod,
        itemsPrice:req.body.itemsPrice,
        shippingPrice:req.body.taxPrice,
        totalPrice:req.body.totalPrice,
        user:req.user._id,



    })
    const order = await newOrder.save();
    res.status(201).send({message:"New Order Created",order})
}))

export default orderRouter;