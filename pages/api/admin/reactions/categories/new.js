import ReactionCategory from "../../../../../models/ReactionCategory";
import dbConnect from "../../../../../lib/db-connect";
import { isAdminAuthenticated } from "../../../../../lib/auth";

export default async function newReactionCategory(req, res) {
  try {
    await dbConnect();
    // if (!(await isAdminAuthenticated(req, res))) {
    //   return res.status(401).end("Unauthorized");
    // }
    const date_now = Date.now();
    const new_reaction_category = new ReactionCategory({
      name: req.body.name,
      created: date_now,
      modified: date_now,
    });
    if (req.body.parent_category_id) {
      new_reaction_category.parent_category_id = req.body.parent_category_id;
    }
    const error = await new_reaction_category.validateSync();
    if (error) {
      let errorMsg = "";
      Object.entries(error.errors).forEach(([label, { message }]) => {
        errorMsg = `Wrong ${label}: ${message}`;
      });
      return res.status(400).end(errorMsg);
    }

    await new_reaction_category.save();
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
