const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userController");

const router = require("express").Router();


//GET ALL USERS
router.get("/",middlewareController.verifyToken, userController.getAllUsers);

//DELETE USERS
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUsers);

//Can_open
router.put("/:id", middlewareController.verifyTokenAndAdminAuth, userController.updateUserStatus);

//Get HistoryPassWord
router.get("/passwordhistory", middlewareController.verifyTokenAndAdminAuth, userController.getAllPasswordHistory);


module.exports = router;