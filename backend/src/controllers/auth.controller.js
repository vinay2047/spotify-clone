import { User } from "../models/user.model.js";

export const authCallback=async(req,res)=>{
    const {id,firstName,lastName,imageUrl}=req.body
      console.log("Auth callback request body:", req.body);

    try {
        const existingUser=await User.findOne({clerkId:id})
        if(!existingUser){
            await User.create({
                clerkId:id,
               fullName: `${firstName || ""} ${lastName || ""}`.trim(),
                imageUrl,

            })
                 console.log("User created successfully.");


        }
        res.status(200).json({success:true})
    } catch (error) {
        console.log('Error in auth callback')
    }
}