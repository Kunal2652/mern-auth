import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        res.json({
            success:true,
            userData:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                adress:user.adress,
               
                isAccountVerified:user.isAccountVerified,
            }
        })

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
export const updateUserProfile=async (req,res) => {
    try {
        const {userId,name,email,phone,adress}=req.body;
        const user=await userModel.findById(userId);

        if(!user){
            return res.json({success:false,message:"User not found"})
        }
        user.name=name||user.name;
        user.email=email||user.email;
        user.phone=phone||user.phone;
        user.adress=adress||user.adress;
   
        await user.save();

        return res.json({success:true,message:"Profile updated successfully",user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            adress:user.adress,
       
        }})
    } catch (error) {
        console.log(error.message);
        return res.json({success:false,message:error.message})
    }
}