import { Response, Request } from "express";
import { DatabaseError } from "sequelize";

import { pino } from "pino";
import Item from "../../db/models/items.js";

const logger = pino();

const deleteItem = async (req: Request, res: Response) => {
  const itemID = req.body.itemID;
  try {
    const rowToDelete = await Item.findByPk(itemID);
    if (rowToDelete?.dataValues.id) {
      const soldBy = rowToDelete?.dataValues.soldBy;
      if (soldBy === res.locals.user) {
        await Item.destroy({
          where: { id: itemID },
        });
        return res.status(204).json({
          status: "success",
        });
      } else {
        return res.status(400).json({
          status: "error",
          error: {
            message: `You cannot perform this action. Item was not created by ${res.locals.user}`,
            code: 400,
          },
        });
      }
    } else {
      return res.status(400).json({
        status: "error",
        error: {
          message: "Item does not exist",
          code: 400,
        },
      });
    }
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

export default deleteItem;
