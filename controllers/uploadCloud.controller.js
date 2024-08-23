const services = require("../services/uploadCloud.service");
const imagekit = require("../config/lib/imagekit");

const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file;

    if (!title || !description) {
      return res.status(400).json({
        status: "error",
        message: "Please provide all required fields",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "Please upload an image",
      });
    }

    const uploadImage = await imagekit.upload({
      file: file.buffer.toString("base64"), // required
      fileName: `image-${Date.now()}`,
      folder: "/binar-assets",
      tags: ["binar"],
    });

    const result = await services.createPost({
      title,
      description,
      image_url: uploadImage.url,
      file_id: uploadImage.fileId,
    });
    res.status(201).json({
      status: "success",
      message: "Post created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const result = await services.getAllPosts();
    res.status(200).json({
      status: "success",
      message: "Posts retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existingPost = await services.getPostById(id);
    if (!existingPost) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }

    const result = await services.getPostById(id);
    res.status(200).json({
      status: "success",
      message: "Posts retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description } = req.body;

    const existingPost = await services.getPostById(id);
    if (!existingPost) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }

    let image_url = existingPost.image_url;
    if (req.file) {
      image_url = req.file.path;
    }

    const data = {
      title,
      description,
      image_url,
    };

    const result = await services.updatePost(id, data);
    res.status(200).json({
      status: "success",
      message: "Post updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const existingPost = await services.getPostById(id);
    if (!existingPost) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }

    // delete file in imagekit
    const fileId = existingPost.file_id;
    await imagekit.deleteFile(fileId);

    const result = await services.deletePost(id);
    res.status(200).json({
      status: "success",
      message: "Post deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  // uploadBanner,
};
