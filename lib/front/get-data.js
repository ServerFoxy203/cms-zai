import dbConnect from "../db-connect";
import Post from "../../models/Post";
import ConfigEntry from "../../models/ConfigEntry";
import PostCategory from "../../models/PostCategory";
import { ObjectID } from "bson";

export async function getPosts() {
  try {
    await dbConnect();
    const posts = await Post.find();
    return posts;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function getPostCategories() {
  try {
    await dbConnect();
    const postCategories = await PostCategory.find();
    return postCategories;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function getPostsIDs() {
  await dbConnect();
  // do czego ta funkcja?
  const posts = await Post.find();
  return posts;
}

export async function getPost(params) {
  try {
    await dbConnect();
    const postId = params.id;
    const post = await Post.findOneById(postId);
    return post;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getPublicContent() {
  try {
    await dbConnect();
    const configs = await ConfigEntry.find();
    if (configs.length) {
      const parsed = JSON.parse(configs[0].body);
      return parsed;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error)
    return error;
  }
}
