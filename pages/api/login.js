import initDB from '../../helpers/initdb';
import User from '../../models/User';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

initDB()

export default async(req, res)=> {
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const{email, password} = req.body
    try {
        if (!email || !password) {
            return res.status(422).json({error:'Please enter all the fields'});
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(422).json({error:'User with email id ' + email + 'does not exist'});
        }
        
        const pwdDoMatch = await bcrypt.compare(password, user.password);
        if (pwdDoMatch) {
            const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:"7d"});
            console.log('Token: ' + token);
            const{username, email, role} = user;


            res.status(201).json({token, user:{username, email, role}});

        } else {
            return res.status(422).json({error:'Password entered is invalid'}); 
        }
    } catch(err) {
        res.status(500).json({error:'Exception while creating the user'})
    }
}

