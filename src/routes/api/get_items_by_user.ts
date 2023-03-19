import { Response, Request } from "express";
import { DatabaseError } from "sequelize";

import { pino } from "pino";
import Item from "../../db/models/items.js";

const logger = pino();

const getItemsByUser = async (req: Request, res: Response) => {
  try {
    const user = req.query.user as string;
    if (user) {
      const items = await Item.findAll({
        where: {
          soldBy: user,
        },
      });
      return res.status(200).json({
        status: "success",
        items: items,
      });
    }
    return res.status(400).json({
      status: "error",
      error: {
        message: "User should be provided",
        code: 400,
      },
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

export default getItemsByUser;
