import User from '../../models/User';
import AuthenticateUser from "../../helpers/AuthenticateUser";

export default async (req, res) => {
    console.log('User related APIs. Method Name: ' + req.method);
    switch(req.method) {
        case "GET": {
            await getUserRole(req,res);
            break;
        }
        case "PUT": {
            await updateUserRole(req,res);
            break;
        }
    }
}

const getUserRole = AuthenticateUser(async(req,res)=> {
        try {
            const users = await User.find({
                _id: {
                    $ne:req.userId
                }
            }).select("-password");
            console.log('Users count : ' + users.length);
            console.log(users);
            res.status(200).json(users);
        } catch (err) {
            return res.status(401).json({error:"Exception while retieving users from DB"})
        }
    }
)

const updateUserRole = AuthenticateUser(async(req,res)=> {           
    try {
        const {_id, role} = req.body;
        const newRole = role =="user" ? "admin" : "user";
        const user = await User.findOneAndUpdate(
            {_id:_id},
            {role:newRole},
            {new:true}
        ).select("-password");
        console.log(user);
        res.status(200).json(user);

    } catch (err) {
        return res.status(401).json({error:"Exception while updating user role"})
    }
}
)
