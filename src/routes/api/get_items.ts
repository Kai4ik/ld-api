import { Response, Request } from "express";
import { DatabaseError } from "sequelize";

import { pino } from "pino";
import Item from "../../db/models/items.js";

const logger = pino();

const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.findAll();
    return res.status(200).json({
      status: "success",
      items: items,
    });
  } catch (e) {
    let errorMessage = "Unknown error occurred";
    if (e instanceof DatabaseError) {
      errorMessage = e.message;
    }
    logger.error(errorMessage);
    return res.status(500).json({
      status: "error",
      error: {
        message: errorMessage,
        code: 500,
      },
    });
  }
};

export default getAllItems;
