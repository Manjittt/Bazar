import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const registerController = async (req, res)=>{
    const {name, email , password , phone, address} = req.body;
    try {
        // validation 
        if (!name ){
            return res.status(400).json({
                message: "Name is required",
                success :false
            })

        }
        if(!email){
            return res.status(400).json({
                message: "Email is Required",
                sucess : false
            })

        }
        if(!password){
            return res.status(400).json({
                message: "Password is Required",
                success : false
            })

        }
        if(!phone){
            return res.status(400).json({
                message: "Phone is Required",
                success : false
            })

        }
        if(!address){
            return res.status(400).json({
                message: "Address is Required",
                success : false
            })
        }
        // check user
         const exigingUser = await User.findOne({email})
         if (exigingUser){
            return res.status(200).json({
                message : "Already Register Please Login",
            })
         }
         // hash password
          const hashedPassword = await bcrypt.hash(password, 10);
          
        // register user
          const user = await  new User({
            name ,
            email,
            password: hashedPassword,
            phone,
            address

          }).save();
          res.status(201).json({
            sucess: true,
            message: "User Registered Sucessfully",
            user,
          })

    }
     catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            message: "Error in Registration",
            error,
        })
    }
}

export const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        // validation
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password are required",
                success: false
            });
        }

        // check user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "incorrect password",
                success: false
            });
        }
        
     const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        // attach token to user object
        user.token = token;
        // remove password from user object
        user.password = undefined;
          return res.status(200).json({
            success: true,
            message: "Login successful",
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in login",
            error
        });
    }
}