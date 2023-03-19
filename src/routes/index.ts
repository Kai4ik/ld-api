import express, { Response, Request, NextFunction } from "express";
import postItem from "./api/post_item.js";
import deleteItem from "./api/delete_item.js";
import getAllItems from "./api/get_items.js";

// Create a router that we can use to mount our API
const router = express.Router();

const ifSeller = (req: Request, res: Response, next: NextFunction) => {
  const role = res.locals.role;
  return role === "seller"
    ? next()
    : res.status(401).json({
        status: "error",
        error: {
          message:
            "Not Authorized to perform this action. You should be logged in as a seller",
          code: 401,
        },
      });
};

router.post("/items", ifSeller, postItem);
router.delete("/items", ifSeller, deleteItem);
router.get("/items", getAllItems);

export default router;
