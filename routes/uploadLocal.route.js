const router = require("express").Router();
const controller = require("../controllers/uploadLocal.controller");
const { upload } = require("../config/storage/local");
const { cloud } = require("../config/storage/cloud");

router.post("/", upload.single("image"), controller.createPost);
router.get("/", controller.getAllPosts);
router.get("/:id", controller.getPostById);
router.put("/:id", upload.single("image"), controller.updatePost);
router.delete("/:id", controller.deletePost);

// cloud storage
// router.post(
//   "/upload",
//   cloud(["image/png", "image/jpeg"]).single("image"),
//   controller.uploadBanner
// );

module.exports = router;
