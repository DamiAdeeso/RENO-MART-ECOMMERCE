import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { isAdmin, isAuth} from "../utils.js";
import  { v2 as cloudinary } from 'cloudinary'

 cloudinary.config({
  cloud_name:'farifar',
  api_key:'352463215124542',
  api_secret:'sYc6JegZ1B_OpYw2Wvlo_11iBbs'
})
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});
const PAGE_SIZE = 3;
productRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.post("/create",expressAsyncHandler(async (req,res)=>{
// const [name,description,rating,brand,category,price,countInStock,numReviews] = req.body;
  try{
    console.log("here"+req.body.image)
    const result = await cloudinary.uploader.upload('p1.jpg',
      {
        folder:"products"
      })
      console.log(result.secure_url)
    
      const newProduct = await Product(
        {
          name:req.body.name,
          slug:req.body.slug,
          image:{
            public_id:result.public_id,
            url:result.secure_url
          },
          brand:req.body.brand,
          category:req.body.category,
          description:req.body.category,
          price:req.body.price,
          countInStock:req.body.countInStock,
          rating:req.body.rating,
          numReviews:req.body.numReviews
        }
        
      );
      console.log("here"+newProduct)
      const product = await newProduct.save()
      
      res.status(201).send({product,message:"Product Uploded Succesfully"})
  }
  catch(err){
    res.status(401).send({message:err})
  }
  
}))
productRouter.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;

    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const brand = query.brand | "";
    const price = query.price || "";
    const rating = query.rating || "";
    const order = query.order || "";
    const searchQuery = query.query || "";

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            name: {
              $regex: searchQuery,
              $options: "i",
            },
          }
        : {};

    const categoryFilter = category && category !== "all" ? { category } : {};

    const ratingFilter =
      rating && rating !== "all"
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};

    const priceFilter =
      price && price !== "all"
        ? {
            price: {
              $gte: Number(price.split("_")[0]),
              $lte: Number(price.split("_")[1]),
            },
          }
        : {};
      const sortOrder = 
      order==="featured"
      ?{featured:-1}
      :order === "lowest"
      ?{price:1}
      :order === "highest"
      ?{price:-1}
      :order === "toprated"
      ?{rating:-1}
      :order === "newest"
      ?{createdAt:-1}
      :{_id:-1};

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
    .sort(sortOrder)
    .skip(pageSize *(page-1))
    .limit(pageSize);


    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })

    res.send({
      products,
      countProducts,
      page,
      pages:Math.ceil(countProducts/pageSize)
    });
  })
);
productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  })
);
productRouter.get("/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

export default productRouter;
