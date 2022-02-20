const express = require("express")

const router = express.Router();
const shopController = require("./../controller/shopController")
const userController = require("./../controller/userController")
const authController =require("./../controller/authController")

router
    .route("/shop",)
    .get(shopController.getAllShops)
    .post(authController.verifyToken,  shopController.createShop)//admin

router
    .route("/shop/:id")
    .get(shopController.getShop)
    .put(authController.restrictTo("owner"), authController.verifyToken, shopController.updateShop)//owner-admin ??
    .delete(authController.restrictTo("admin"), authController.verifyToken,  shopController.deleteShop)//admin

router
    .route("/user")
    .get(authController.restrictTo("admin"), authController.verifyToken, userController.getAllUsers)//admin

router
    .route("/user/:id")
    .get(authController.restrictTo("admin"), authController.verifyToken,  userController.getUser) //admin
    .put(authController.restrictTo("admin"), authController.verifyToken,  userController.updateUser) //admin ??
    .delete(authController.restrictTo("admin"), authController.verifyToken, userController.deleteUser)//admin

router
    .route("/register")
    .post(authController.registerUser)

router
    .route("/login")
    .post(authController.loginUser)


module.exports = router;