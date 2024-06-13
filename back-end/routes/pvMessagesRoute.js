const router = require("express").Router();

const pvmessagesController = require("../controllers/pvMessagesController");

router.get("/pvmessages", pvmessagesController.findAll);
router.get("/pvmessages/:id", pvmessagesController.findOne);
router.post("/pvmessages", pvmessagesController.create);
router.put("/pvmessages/:id", pvmessagesController.update);
router.delete("/pvmessages/:id", pvmessagesController.delete);

module.exports = router;