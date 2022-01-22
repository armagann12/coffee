const express = require("express")

const router = express.Router();
const shopController = require("./../controller/shopController")
const userController = require("./../controller/userController")
const auth =require("./../controller/authController")

router
    .route("/shop",)
    .get(shopController.getAllShops)
    .post(auth.restrictTo("admin"), shopController.createShop)

router
    .route("/shop/:id")
    .get(shopController.getShop)
    .put(auth.restrictTo("admin", "owner"), shopController.updateShop)
    .delete(auth.restrictTo("admin"), shopController.deleteShop)

router
    .route("/user/:id")
    .get(auth.restrictTo("user"), userController.getUser)
    .put(auth.restrictTo("user"), userController.updateUser)

router
    .route("/register")
    .post(userController.registerUser)

router
    .route("/login")
    .post(userController.loginUser)





module.exports = router;