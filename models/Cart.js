import mongoose, {models} from 'mongoose'

const {ObjectId} = mongoose.Schema.Types;
const cartSchema = new mongoose.Schema({
    user:{
        type:ObjectId,
        ref: "User"
    },
    products:[
        {
            quantity:{
                type:Number,
                default:1
            },
            product:{
                type:ObjectId,
                ref:"product"
            },
        }
    ]})

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema);

/*
Cart value for a particular user will be like
{
    user:"fdgd"
    products:[{quantity:2, product:"gfdfg"}, {quantity:3, product:"dsfsfgg"}]
}
*/

