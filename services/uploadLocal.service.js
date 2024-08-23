const prisma = require("../config/prisma");

const createPost = async (data) => {
  const { title, description, image_url } = data;
  const result = await prisma.uploadLocal.create({
    data: {
      title: title,
      description: description,
      image_url: image_url,
    },
  });
  return result;
};

const getAllPosts = async () => {
  return await prisma.uploadLocal.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      image_url: true,
    },
  });
};

const getPostById = async (id) => {
  return await prisma.uploadLocal.findUnique({
    where: { id },
  });
};

const updatePost = async (id, reqBody) => {
  return await prisma.uploadLocal.update({
    where: { id },
    data: reqBody,
  });
};

const deletePost = async (id) => {
  await prisma.uploadLocal.delete({
    where: { id },
  });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
