import mongoose, {models} from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{ //User role can be user, seller, root/admin uers
        type:String,
        required:true,
        default:"user",
        enum:["user", "admin", "root", "seller"]
    }
}, {
    timestamps:true // This will make sure that createat and modified at fields are added in the schema automatically
})

export default mongoose.models.User || mongoose.model('User', userSchema);
