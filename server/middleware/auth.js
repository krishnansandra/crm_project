const jwt = require("jsonwebtoken");
const User = require("../models/User");
async function protect(req,res,next) {
  try {
    const header=req.headers.authorization;
    if(!header || !header.startsWith("Bearer ")) return res.status(401).json({message:"Authentication token is required"});
    const decoded=jwt.verify(header.split(" ")[1],process.env.JWT_SECRET);
    const user=await User.findById(decoded.id).select("_id name email");
    if(!user) return res.status(401).json({message:"User no longer exists"});
    req.user=user; next();
  } catch(err) {
    if(["TokenExpiredError","JsonWebTokenError"].includes(err.name)) return res.status(401).json({message:"Invalid or expired token"});
    next(err);
  }
}
module.exports={protect};
