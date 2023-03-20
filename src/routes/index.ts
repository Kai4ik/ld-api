import express, { Response, Request, NextFunction } from "express";
import postItem from "./api/post_item.js";
import deleteItem from "./api/delete_item.js";
import getAllItemsOnSale from "./api/get_items_on_sale.js";
import getItemsByUser from "./api/get_items_by_user.js";
import postOrder from "./api/post_order.js";
import getOrdersByUser from "./api/get_order.js";

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

const ifBuyer = (req: Request, res: Response, next: NextFunction) => {
  const role = res.locals.role;
  return role === "buyer"
    ? next()
    : res.status(401).json({
        status: "error",
        error: {
          message:
            "Not Authorized to perform this action. You should be logged in as a buyer",
          code: 401,
        },
      });
};

router.post("/items", ifSeller, postItem);
router.delete("/items", ifSeller, deleteItem);
router.get("/items", getAllItemsOnSale);
router.get("/itemsByUser", getItemsByUser);
router.post("/orders", ifBuyer, postOrder);
router.get("/orders", ifBuyer, getOrdersByUser);

export default router;
