const router=require("express").Router();
const {register,login,me}=require("../controllers/authController");
const {protect}=require("../middleware/auth");
const {validateRegistration,validateLogin}=require("../middleware/validate");
router.post("/register",validateRegistration,register);
router.post("/login",validateLogin,login);
router.get("/me",protect,me);
module.exports=router;
