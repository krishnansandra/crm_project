

const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();
const express=require("express"),cors=require("cors"),connectDB=require("./config/db");
const {notFound,errorHandler}=require("./middleware/errorHandler");
const app=express();
app.use(cors({origin:process.env.CLIENT_ORIGIN||"http://localhost:5173"}));
app.use(express.json({limit:"1mb"}));
app.get("/",(req,res)=>res.json({success:true,message:"CRM Backend API is running"}));
app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api/customers",require("./routes/customerRoutes"));
app.use(notFound);app.use(errorHandler);
const PORT=process.env.PORT||5000;
if(require.main===module) connectDB().then(()=>app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))).catch(e=>{console.error("MongoDB connection failed:",e.message);process.exit(1);});
module.exports=app;
