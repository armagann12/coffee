const express = require("express")

const router = express.Router();
const shopController = require("./../controller/shopController")
const userController = require("./../controller/userController")
const authController =require("./../controller/authController")

router
    .route("/shop",)
    .get(shopController.getAllShops)

router
    .route("/shop/:id")
    .get(shopController.getShop)

router
    .route("/user/:id")
    .get(authController.verifyToken,  userController.getUser) //authController.restrictTo("user"),
    .put(authController.verifyToken,  userController.updateUser) //authController.restrictTo("user"),


router
    .route("/register")
    .post(authController.registerUser)

router
    .route("/login")
    .post(authController.loginUser)

//For Dashbords

router 
    .route("/admin") //get ekliycen hepsi için teker teker için
    .post(authController.verifyToken,  shopController.createShop) //authController.restrictTo("admin"),
    .put(authController.verifyToken,  shopController.updateShop) //authController.restrictTo("admin"),
    .delete(authController.verifyToken,  shopController.deleteShop) //authController.restrictTo("admin"),

router
    .route("owner") //kendi shop get
    .put(authController.verifyToken,  shopController.updateShop) //authController.restrictTo("owner"),




module.exports = router;