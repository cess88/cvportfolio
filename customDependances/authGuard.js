import UserModel from "../models/user.js";

let authGuard = async(req,res,next)=>{
    let user = await UserModel.findOne({_id:req.session.user});
    if (user) {
        next()
    }else{
        res.redirect("/adduser")
    }
}

export default authGuard