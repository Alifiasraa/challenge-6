const imageKitConf = require("../config/lib/imageKit");
const services = require("../services/gallery.service");
const fs = require("fs");
const path = require("path");

const createPost = async (req, res) => {
  try {
    console.log(req.file);
    const { title, description } = req.body;
    const image_url = req.file.path;

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
    const image_url = req.file.path;

    const existingPost = await services.getPostById(id);
    if (!existingPost) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
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
    const filePath = path.join(
      // __dirname,
      // "../controller/public/images",
      existingPost.image_url
    );
    console.log(filePath);
    if (fs.existsSync(filePath)) {
      fs.rm(filePath);
    }
    // if (fs.existsSync(filePath)) {
    //   try {
    //     fs.rm(filePath);
    //     console.log(`File deleted successfully: ${filePath}`);
    //   } catch (error) {
    //     console.error(`Failed to delete file: ${filePath}`);
    //     throw error;
    //   }
    // }

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

const uploadBanner = async (req, res) => {
  const file = req.file;
  const customFileName = `banner-${Date.now()}`;

  imageKitConf
    .upload({
      file: file.buffer.toString("base64"), // required
      fileName: customFileName,
      folder: "/gallery-assets",
      tags: ["gallery-banner"],
    })
    .then((response) => {
      res.status(201).json({
        status: "success",
        message: "Banner Uploaded successfully",
        data: response,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  uploadBanner,
};
