import Stripe from 'stripe';
import {v4 as uuidV4} from 'uuid';
import Cart from '../../models/Cart';
import Order from '../../models/Order';
import jwt from 'jsonwebtoken';
import initDB from '../../helpers/initdb';

initDB();
const stripe = Stripe(process.env.STRIPE_SECRET);
export default async (req, res) => {
    console.log('Payment related APIs. Method Name: ' + req.method);
    switch(req.method) {
        case "GET": {
            console.log('GET request yet to be implemented')
            break;
        }
        case "POST": {
            doPayment(req,res);
            break;
        }
        case "DELETE": {
            console.log('DELETE request yet to be implemented')
            break;
        }
        case "PUT": {
            console.log('PUT request yet to be implemented')
            break;
        }
    }
}

const doPayment = (async(req,res)=> {           
        const {paymentInfo} = req.body;
        const {authorization} = req.headers; 
        if (!authorization) {
            return res.status(401).json({error:"User must be logged in"})
        }
        
        try {
            const {userId} = jwt.verify(authorization, process.env.JWT_SECRET);
            const cart = await Cart.findOne({user:userId})
                        .populate("products.product");
            let price = 0;
            cart.products.forEach(item => {
                price += item.quantity * item.product.price;
            });
            console.log('Total Price calculated as' + price);

            const prevCustomer = await stripe.customers.list({
                email:paymentInfo.email
            });
            console.log('prevCustomer: ' + JSON.stringify(prevCustomer));

            const isExistingCustomer = prevCustomer.data.length > 0;
            console.log('isExistingCustomer: ' + isExistingCustomer);
            let newCustomer
            if (!isExistingCustomer) {
                newCustomer = await stripe.customers.create({
                    email:paymentInfo.email,
                    source:paymentInfo.id
                })
            }

            await stripe.charges.create({
                currency:"INR",
                amount: price* 100,
                receipt_email:paymentInfo.email,
                customer:isExistingCustomer ? prevCustomer.data[0].id : newCustomer.id,
                description: `You purchased a product | ${paymentInfo.email}`
            }, {
                idempotencyKey:uuidV4()
            });

            await new Order({
                user:userId,
                email:paymentInfo.email,
                total:price,
                products:cart.products
            }).save();

            await Cart.findOneAndUpdate(
                {_id:cart._id},
                {$set:{products:[]}}
            )

            res.status(200).json({message:"Payment is successful"});
    } catch (err) {
        return res.status(401).json({error:"Exception while doing the payment"})
    }
}
)
