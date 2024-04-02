import Post from "../../../models/Post";
import ConfigEntry from "../../../models/ConfigEntry";
import dbConnect from "../../../lib/db-connect";
import User from "../../../models/User";

export default async function front_page_posts(req, res) {
  try {
    await dbConnect();
    const config = await ConfigEntry.findOne();
    if (!config) {
      return res.status(400).end("Cannot find posts");
    }
    const front_page_posts_ids = JSON.parse(config.body).front_page_posts_ids;

    const posts = await Post.find({ _id: { $in: front_page_posts_ids } }).exec();
    if (!posts) {
      return res.status(400).end("Cannot find posts");
    }
    console.log("API", posts);
    return res.status(200).send(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error.message);
  }
}