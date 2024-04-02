import { createUser } from "../../../lib/user";
import dbConnect from "../../../lib/db-connect";

export default async function signup(req, res) {
  await dbConnect();
  try {
    const { ok, msg } = await createUser(req.body);
    if (!ok) {
      console.log(msg);
      res.status(403).send(msg);
    }
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
