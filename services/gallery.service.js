const prisma = require("../config/prisma");

const createPost = async (data) => {
  const { title, description, image_url } = data;
  const result = await prisma.gallery.create({
    data: {
      title: title,
      description: description,
      image_url: image_url,
    },
  });
  return result;
};

const getAllPosts = async () => {
  const result = await prisma.gallery.findMany();
  return result;
};

const getPostById = async (id) => {
  const result = await prisma.gallery.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const updatePost = async (id, reqBody) => {
  const result = await prisma.gallery.update({
    where: {
      id: id,
    },
    data: reqBody,
  });
  return result;
};

const deletePost = async (id) => {
  await prisma.gallery.delete({
    where: {
      id: id,
    },
  });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
