const emailOK = (v) =>
  typeof v === "string" &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  function validateRegistration(req,res,next) {
  const {name,email,password}=req.body||{}, errors=[];
  if(typeof name!=="string" || name.trim().length<2) errors.push("Name must contain at least 2 characters");
  if(!emailOK(email)) errors.push("A valid email is required");
  if(typeof password!=="string" || password.length<8) errors.push("Password must contain at least 8 characters");
  if(errors.length) return res.status(400).json({message:"Validation failed",errors});
  next();
}
function validateLogin(req,res,next) {
  const {email,password}=req.body||{};
  if(!emailOK(email)||typeof password!=="string"||!password) return res.status(400).json({message:"Valid email and password are required"});
  next();
}
function validateCustomer(req,res,next) {
  const b=req.body||{}, errors=[];
  if(typeof b.name!=="string"||b.name.trim().length<2) errors.push("Customer name must contain at least 2 characters");
  if(!emailOK(b.email)) errors.push("A valid customer email is required");
  if(b.status!==undefined&&!["Lead","Prospect","Customer"].includes(b.status)) errors.push("Status must be Lead, Prospect, or Customer");
  for(const key of ["phone","company","notes"]) if(b[key]!==undefined&&typeof b[key]!=="string") errors.push(`${key} must be text`);
  if(errors.length) return res.status(400).json({message:"Validation failed",errors});
  next();
}
module.exports={validateRegistration,validateLogin,validateCustomer};
