const router = require("express").Router();

const friendshipsController = require("../controllers/friendshipsController");

router.get("/friendships", friendshipsController.findAll);
router.get("/friendships/:id", friendshipsController.findOne);
router.post("/friendships", friendshipsController.create);
router.put("/friendships/:id", friendshipsController.update);
router.delete("/friendships/:id", friendshipsController.delete);

module.exports = router;