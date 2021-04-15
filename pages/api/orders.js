import AuthenticateUser from "../../helpers/AuthenticateUser";
import initDB from "../../helpers/initdb";
import Order from "../../models/Order";

initDB();

export default AuthenticateUser(async (req, res)=> {
    const orders = await Order.find({user:req.userId})
                    .populate("products.product");
    console.log('orders recived from DB');
    console.log(orders);
    res.status(200).json(orders);
})
