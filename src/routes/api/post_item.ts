import { Response, Request } from "express";
import { v4 as uuidv4 } from "uuid";

import { pino } from "pino";
import { itemDataSchema } from "../../schemas/item.js";
import Item from "../../db/models/items.js";

const logger = pino();

const postItem = async (req: Request, res: Response) => {
  const itemData = req.body;
  itemData.id = uuidv4();
  delete itemData.role;
  const { error } = itemDataSchema.validate(itemData);
  if (error !== undefined) {
    return res.status(400).json({
      status: "error",
      error: {
        message: error.details[0].message,
        code: 400,
      },
    });
  }
  try {
    const newItem = await Item.create(itemData);
    logger.error(newItem);
    return res.status(200).json({
      status: "success",
      itemID: newItem.id,
    });
  } catch (e) {
    logger.error(e);
    return res.status(500).json({
      status: "error",
      error: {
        message: "Unknown error occurred",
        code: 500,
      },
    });
  }
};

export default postItem;
