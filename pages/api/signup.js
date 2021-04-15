import initDB from '../../helpers/initdb';
import User from '../../models/User';
import Cart from '../../models/Cart';
import bcrypt from 'bcryptjs'

initDB()

export default async(req, res)=> {
    const{username, email, password} = req.body
    try {
        if (!username || !email || !password) {
            return res.status(422).json({error:'Please enter all the fields'});
        }
        const user = await User.findOne({email});
        console.log('User received from DB: ' + user);
        if (user) {
            return res.status(422).json({error:'User already exists with email' + email});
        }
        const encryptedPwd =  await bcrypt.hash(password, 12);
        console.log('encrypted password: ' + encryptedPwd);
        const newUser  = await new User({
            username,
            email,
            password:encryptedPwd
        }).save()
        console.log(newUser);
        
        const userCart = await new Cart({
            user:newUser._id
        }).save()
        res.status(201).json({message:'Sign up successful for user with email' + email});

    } catch(err) {
        res.status(500).json({error:'Exception while creating the user'})
    }
}

