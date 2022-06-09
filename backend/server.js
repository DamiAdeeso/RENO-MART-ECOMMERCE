import express from "express";
import data from "./data.js";
import mongoose from "mongoose"
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

dotenv.config() 

mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log("connected to db")
}).catch((err)=>{
  console.log(err.message);
})
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/api/keys/paypal",(req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID || "sb")
})
app.use("/api/seed",seedRouter);
app.use("/api/products",productRouter);
app.use("/api/users",userRouter );
app.use("/api/orders",orderRouter)


app.use((err,req,res,next)=>{
  res.status(500).send({message:err.message});

}
)


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
