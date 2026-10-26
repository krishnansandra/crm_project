const mongoose=require("mongoose"), Customer=require("../models/Customer");
async function list(req,res,next){
 try{
  const filter={owner:req.user._id}, search=(req.query.search||"").trim(), status=req.query.status||"";
  if(["Lead","Prospect","Customer"].includes(status)) filter.status=status;
  if(search){const safe=search.replace(/[.*+?^${}()|[\\]\\\\]/g,"\\$&");filter.$or=[{name:{$regex:safe,$options:"i"}},{email:{$regex:safe,$options:"i"}},{company:{$regex:safe,$options:"i"}}];}
  const customers=await Customer.find(filter).sort({createdAt:-1});res.json({count:customers.length,customers});
 }catch(e){next(e);}
}
async function getOne(req,res,next){
 try{if(!mongoose.isValidObjectId(req.params.id))return res.status(400).json({message:"Invalid customer ID"});
 const customer=await Customer.findOne({_id:req.params.id,owner:req.user._id});
 if(!customer)return res.status(404).json({message:"Customer not found"});res.json({customer});}catch(e){next(e);}
}
async function create(req,res,next){
 try{const b=req.body;const customer=await Customer.create({name:b.name.trim(),email:b.email.trim().toLowerCase(),phone:(b.phone||"").trim(),company:(b.company||"").trim(),status:b.status||"Lead",notes:(b.notes||"").trim(),owner:req.user._id});res.status(201).json({message:"Customer created successfully",customer});}catch(e){next(e);}
}
async function update(req,res,next){
 try{
  if(!mongoose.isValidObjectId(req.params.id))return res.status(400).json({message:"Invalid customer ID"});
  const updates={};for(const k of ["name","email","phone","company","status","notes"])if(req.body[k]!==undefined)updates[k]=typeof req.body[k]==="string"?req.body[k].trim():req.body[k];
  if(updates.email)updates.email=updates.email.toLowerCase();
  const customer=await Customer.findOneAndUpdate({_id:req.params.id,owner:req.user._id},updates,{new:true,runValidators:true});
  if(!customer)return res.status(404).json({message:"Customer not found"});res.json({message:"Customer updated successfully",customer});
 }catch(e){next(e);}
}
async function remove(req,res,next){
 try{if(!mongoose.isValidObjectId(req.params.id))return res.status(400).json({message:"Invalid customer ID"});
 const customer=await Customer.findOneAndDelete({_id:req.params.id,owner:req.user._id});
 if(!customer)return res.status(404).json({message:"Customer not found"});res.json({message:"Customer deleted successfully"});}catch(e){next(e);}
}
module.exports={list,getOne,create,update,remove};
