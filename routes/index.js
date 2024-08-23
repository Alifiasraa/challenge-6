const router = require("express").Router();
const localRouter = require("./uploadLocal.route");
const cloudRouter = require("./uploadCloud.route");

router.use("/local", localRouter);
router.use("/cloud", cloudRouter);

module.exports = router;
