const router = require("express").Router();

const usersController = require("../controllers/usersController");

router.get("/users", usersController.findAll);
router.get("/users/:id", usersController.findOne);
router.post("/users", usersController.create);
router.put("/users/:id", usersController.update);
router.delete("/users/:id", usersController.delete);

module.exports = router;