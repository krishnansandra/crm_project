const bcrypt=require("bcryptjs"), jwt=require("jsonwebtoken"), User=require("../models/User");
const tokenFor=(id)=>jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||"1d"});
async function register(req,res,next){
  try{
    const name=req.body.name.trim(), email=req.body.email.trim().toLowerCase();
    if(await User.findOne({email})) return res.status(409).json({message:"An account with this email already exists"});
    const user=await User.create({name,email,password:await bcrypt.hash(req.body.password,12)});
    res.status(201).json({message:"Registration successful",token:tokenFor(user._id),user:{id:user._id,name:user.name,email:user.email}});
  }catch(e){next(e);}
}
async function login(req,res,next){
  try{
    const user=await User.findOne({email:req.body.email.trim().toLowerCase()}).select("+password");
    if(!user||!(await bcrypt.compare(req.body.password,user.password))) return res.status(401).json({message:"Invalid email or password"});
    res.json({message:"Login successful",token:tokenFor(user._id),user:{id:user._id,name:user.name,email:user.email}});
  }catch(e){next(e);}
}
function me(req,res){res.json({user:{id:req.user._id,name:req.user.name,email:req.user.email}});}
module.exports={register,login,me};
