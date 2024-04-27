const express = require ('express')

const app = express();

app.use(express.json()) 

const {body, validationResult} = require('express-validator')

 let products = [
  
    {
        id:2,
        Name: "blackBrownJacket",
        color: "black",
        price: 1500,
        image:"./images/black-man-brown-jacket-pink-background-studio-shot"
    }
]

app.get('/api/products',(req,res)=>{
      res.json(products);
})


app.get('/api/products/:productId',(req,res)=>{
    const productId = +req.params.productId;

    let product = products.find((product)=> product.id === productId )
    if (!product){
       return res.status(404).json("NotFound");
    }
    res.json(product)
})

app.post('/api/products',
  [
    body('Name')
     .notEmpty()
     .withMessage("Name is required")
     .isLength({max:50}),
    body("price")
     .notEmpty()
     .withMessage("price is required")
     .isLength({max:5})
  ] 
,(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }
    products.push({id: products.length + 1 , ...req.body})
    res.status(201).json(products); 

})

app.patch('/api/products/:productId', (req , res)=>{
    const productId = +req.params.productId;
    let product = products.find((product)=> product.id === productId )

    if(!product){
        return res.status(404).json("NotFound");
    }
    product = {...product, ...req.body}
    res.status(200).json(product)
})

app.delete('/api/products/:productId', (req, res)=>{
    const productId = +req.params.productId;
    products = products.filter((product)=> product.id !== productId)
    res.status(200).json({success:true});
})




app.listen(3002, ()=>{
    console.log("i am listening")
})