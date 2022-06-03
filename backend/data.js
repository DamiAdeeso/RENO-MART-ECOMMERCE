import bCrypt from "bcryptjs"

const data = {
    users:[
        {
        name:"Reno",
        email:"admin@renomart.com",
        password:bCrypt.hashSync("123456"),
        isAdmin:"true"
    },
    {
        name:"User",
        email:"user@renomart.com",
        password:bCrypt.hashSync("123456"),
        isAdmin:"false"
    }
    ],
    products:[
        {   
            //_id: "1",
            name:"H&M Shirt",
            slug:"H&M-slim-shirt",
            category:"Shirts",
            image:"./images/p1.jpg",
            price:120,
            countInStock:10,
            brand:"Nike",
            rating: 1.5,
            numReviews:10,
            description:"high quality shirt"

        },
        {
           // _id: "2",
            name:"M&S Shirt",
            slug:"m&s-slim-shirt",
            category:"Shirts",
            image:"./images/p2.jpg",
            price:150,
            countInStock:0,
            brand:"h&s",
            rating: 4.5,
            numReviews:10,
            description:"high quality shirt"

        },
        {
           // _id: "3",
            name:"Tesco Pants",
            slug:"tesco-slim-shirt",
            category:"Pants",
            image:"./images/p3.jpg",
            price:60,
            countInStock:10,
            brand:"Tesco",
            rating: 4.5,
            numReviews:10,
            description:"high quality Pants"

        },
        {
           // _id: "4",
            name:"Kiwuu Shirt",
            slug:"kiwuu-slim-shirt",
            category:"Shirts",
            image:"./images/p4.jpg",
            price:120,
            countInStock:10,
            brand:"Kiwuu",
            rating: 4.5,
            numReviews:10,
            description:"high quality shirt"

        }
    ]
}

export default data;