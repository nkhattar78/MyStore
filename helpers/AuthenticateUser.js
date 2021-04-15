import jwt from 'jsonwebtoken'

//Creating a higer order component which will act as middleware to check for authentication.
//Components/function need this functionality need to wrap their functionality inside higher order component
export default function AuthenticateUser(iComponent) {
    return(req, res) => {
        const {authorization} = req.headers; 
        if (!authorization) {
            return res.status(401).json({error:"User must be logged in"})
        }
        try {
            const {userId} = jwt.verify(authorization, process.env.JWT_SECRET);
            req.userId = userId;
            return iComponent(req,res);
        } catch (err) {
            return res.status(401).json({error:"Exception while retieving the products saved in users cart"})
        }    
    }
}
