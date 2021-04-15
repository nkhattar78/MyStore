// This is an example of dynamic API
import Product from '../../../models/Products'

export default async (req, res) => {
    console.log('product ID related APIs');
    console.log('Method name: ' + req.method);
    switch(req.method) {
        case "GET": {
            await getProduct(req,res)
            break;
        }
        case "POST": {
            console.log('POST request yet to be implemented')
            break;
        }
        case "DELETE": {
            await deleteProduct(req,res)
            break;
        }
        case "PATCH": {
            console.log('PATCH request yet to be implemented')
            break;
        }

    }
}

const getProduct = async(req,res)=> {
    const {pid} = req.query;
    console.log('ID reeived in query: ' + pid);
    const product = await Product.findOne({_id:pid})
    console.log('product received from DB: ' + JSON.stringify(product));
    res.status(200).json(product);
}

const deleteProduct = async(req,res)=> {
    const {pid} = req.query;
    console.log('ID reeived in query: ' + pid);
    const product = await Product.findByIdAndDelete({_id:pid})
    console.log('product received from DB: ' + JSON.stringify(product));
    res.status(200).json("Product Deleted Successfully");
}
