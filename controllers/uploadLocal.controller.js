const services = require("../services/uploadLocal.service");
const fs = require("fs");
const path = require("path");

const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image_url = "";
    if (req.file) {
      image_url = req.file.path;
    }

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

    const result = await services.createPost({
      title,
      description,
      image_url,
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

    // delete file in ../public/images
    const filePath = path.join(existingPost.image_url);
    if (fs.existsSync(filePath)) {
      fs.rmSync(filePath);
    }

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
};
