import mongoose, {models} from 'mongoose'

const productsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    mediaUrl:{
        type:String,
        required:true
    }
})

export default mongoose.models.product || mongoose.model('product', productsSchema);

/*
    "name": "Product 1",
    "price": 200,
    "description": "Product 1 description",
    "mediaUrl": "URL field"
*/