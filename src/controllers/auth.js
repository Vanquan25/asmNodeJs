import User from "../models/user";
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
       const existUser = await User.findOne({email}).exec();
       if(existUser){
            res.json({
                message: "Email da ton tai"
            })
       };
       const user = await new User({email, name, password}).save();
       res.json({
           user: {
               _id: user._id,
               name: user.name,
               email: user.email,
           }
       })
    } catch (error) {
        
    }
}

export const signin = async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({email}).exec();
        if(!user){
            res.status(400).json({
                message: "email không tồn tại"
            })
        }
        if(!user.authenticate(password)){
            res.status(400).json({
                message: "Sai mật khẩu"
            })
        }

        const token = jwt.sign({_id: user._id}, "123456", { expiresIn: 60 * 60})

        res.json({
            token,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })
    } catch (error) {
        
    }
}