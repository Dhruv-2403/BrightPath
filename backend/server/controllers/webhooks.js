import { WebHook } from "svix"

import User from "../models/user"

// API controller to manage Clerk auth user with database


export const clerkWebHooks=async(req,res)=>{
    try{
        const hook=new WebHook(process.env.CLERK_WEBHOOK_SECRET)
        await hook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamnp"],
            "svix-signature":req.headers["svix-signature"],
            
        })

        const {data,type}=req.body

        switch(type){
            case "user.created":{
                const userData={
                    _id:data.id,
                    email:data.email.email_address[0].email_address,
                    name:data.first_name+" "+data.last_name,
                    imageUrl:data.image_url,
                }

                await User.create(userData)
                res.json({})
                break
            }

            case "user.updated":{

                const userData={
 
                    email:data.email.email_address[0].email_address,
                    name:data.first_name+" "+data.last_name,
                    imageUrl:data.image_url,
                }

                await User.findByIdAndUpdate(userData,data.id)
                res.json({})
                break

            }

            case "user.deleted":{
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;


            }

            default:
                break;


            
        }



        
    }catch(error){

        res.json({success:false,message:error.message})

    }
}