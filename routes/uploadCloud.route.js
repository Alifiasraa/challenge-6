const router = require("express").Router();
const controller = require("../controllers/uploadCloud.controller");
const { cloud } = require("../config/storage/cloud");

router.post(
  "/",
  cloud(["image/png", "image/jpeg"]).single("image"),
  controller.createPost
);
router.get("/", controller.getAllPosts);
router.get("/:id", controller.getPostById);
router.put(
  "/:id",
  cloud(["image/png", "image/jpeg"]).single("image"),
  controller.updatePost
);
router.delete("/:id", controller.deletePost);

// cloud storage
// router.post(
//   "/upload",
//   cloud(["image/png", "image/jpeg"]).single("image"),
//   controller.uploadBanner
// );

module.exports = router;
