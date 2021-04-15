import jwt from 'jsonwebtoken';
import Cart from '../../models/Cart';
import AuthenticateUser from "../../helpers/AuthenticateUser";

export default async (req, res) => {
    console.log('Cart related APIs. Method Name: ' + req.method);
    switch(req.method) {
        case "GET": {
            getUserCart(req,res)
            break;
        }
        case "POST": {
            console.log('POST request yet to be implemented')
            break;
        }
        case "DELETE": {
            removeProductFromCart(req, res);            
            break;
        }
        case "PUT": {
            updateUserCart(req,res);
            break;
        }
    }
}

const getUserCart = AuthenticateUser(async(req,res)=> {           
        try {
            //Here populate function will populate the reference object and will return the populated arrar in the response
            const cart = await Cart.findOne({user:req.userId})
                        .populate("products.product")
            res.status(200).json(cart.products);
            console.log('jwtResult' + JSON.stringify(jwtResult));
            console.log(cart.products);
        } catch (err) {
            return res.status(401).json({error:"Exception while retieving the products saved in users cart"})
        }
    }
)

const removeProductFromCart = AuthenticateUser(async(req,res)=> {           
    try {
        const {productId} = req.body;

        const cart = await Cart.findOneAndUpdate(
            {user:req.userId},
            {$pull:{products:{product:productId}}},
            {new:true})
            .populate("products.product")
        res.status(200).json(cart.products);
    } catch (err) {
        return res.status(401).json({error:"Exception while removing product from the cart"})
    }
}
)

const updateUserCart = AuthenticateUser(async(req,res)=> {
    const{quantity, productId} = req.body;
    try {
            const cart = await Cart.findOne({user:req.userId});
            const pExists = cart.products.some(pdoc => productId === pdoc.product.toString());
            if (pExists) {
                console.log('product exist in car, quantity need to update');
                //Finding the document in DB whose cart ID is same cart received from some function AND 
                // products.product is same as productId passed from frontEnd in the request body
                // After finding that, update the quantity of the found product.
                await Cart.findOneAndUpdate(
                    {_id:cart._id, "products.product":productId},
                    {$inc:{"products.$.quantity":quantity}}
                )
            } else {
                console.log('product does not exist in cart, new product to be added');
                const newProduct = {quantity, product:productId};
                await Cart.findByIdAndUpdate(
                    {_id:cart._id},
                    {$push:{products:newProduct}}
                )
            }
            return res.status(200).json({message:"Product added to the cart"});
        } catch (err) {
            return res.status(401).json({error:"Exception while retieving the products saved in users cart"})
        }
    }
)
