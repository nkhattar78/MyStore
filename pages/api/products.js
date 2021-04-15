import initDB from '../../helpers/initdb';
import Product from '../../models/Products'

initDB();

// This response will be returned  requesting /api/test endpoint
// export default (req,res)=> {
//     res.json({message:"Hello, this is from Next JS test endpoint"});
// }

// This response will be returned  requesting /api/test endpoint
export default async (req, res) => {
    console.log('product related APIs. Method Name: ' + req.method);
    switch(req.method) {
        case "GET": {
            await getAllProducts(req,res)
            break;
        }
        case "POST": {
            createProduct(req,res);
            break;
        }
        case "DELETE": {
            console.log('DELTE request yet to be implemented')
            break;
        }
        case "PATCH": {
            console.log('PATCH request yet to be implemented')
            break;
        }
    }
}

const getAllProducts = async(req,res)=> {
    try {
        const products = await Product.find().then(products=> {
            res.status(200).json(products)
        })
        } catch (err) {
            res.status(500).json({error:"Exception Occurred while fetching products from server"});
    }
}

const createProduct = async(req,res)=> {
    try {
        const {name, price, description, image} = req.body;
        console.log('name: ' + name + ' price: ' + price + ' desc: ' + description + ' image url: ' + image);
        if (!name || !price || !description || !image) {
            return res.status(422).json({error:"None of the field can be empty"});
        }
        const product = await new Product({
            name,
            price,
            description,
            mediaUrl:image
        }).save();
        res.status(201).json(product);
        } catch(err) {
            console.log('Exception while creating the product');
            console.log(err);
            res.status(500).json({error:"Error while creating the Product"});
    }
}
