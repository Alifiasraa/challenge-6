const prisma = require("../config/prisma");

const createPost = async (data) => {
  const { title, description, image_url, file_id } = data;

  const result = await prisma.uploadCloud.create({
    data: {
      title,
      description,
      image_url,
      file_id,
    },
  });
  return result;
};

const getAllPosts = async () => {
  return await prisma.uploadCloud.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      image_url: true,
    },
  });
};

const getPostById = async (id) => {
  return await prisma.uploadCloud.findUnique({
    where: { id },
  });
};

const updatePost = async (id, reqBody) => {
  return await prisma.uploadCloud.update({
    where: { id },
    data: reqBody,
    select: {
      id: true,
      title: true,
      description: true,
      image_url: true,
      created_at: true,
      updated_at: true,
    },
  });
};

const deletePost = async (id) => {
  await prisma.uploadCloud.delete({
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
