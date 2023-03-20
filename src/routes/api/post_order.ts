import { Response, Request } from "express";
import { v4 as uuidv4 } from "uuid";

import { pino } from "pino";
import { DatabaseError } from "sequelize";
import { orderDataSchema } from "../../schemas/order.js";
import Order from "../../db/models/order.js";
import Item from "../../db/models/items.js";

const logger = pino();

const postOrder = async (req: Request, res: Response) => {
  const itemsIDs: { id: string }[] = req.body.itemsIDs.map((id: string) => {
    return { id: id };
  });
  const orderData = {
    id: uuidv4(),
    orderBy: res.locals.user,
    orderDate: new Date(),
  };

  const { error } = orderDataSchema.validate(orderData);
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
    const foundItems = await Item.findAndCountAll({
      where: {
        id: req.body.itemsIDs,
      },
    });

    if (foundItems.count === itemsIDs.length) {
      const newOrder = await Order.create(orderData);
      logger.info(newOrder);
      const orderID = newOrder.id;

      const updatedReceipts = await Item.update(
        {
          boughtBy: res.locals.user,
          orderId: orderID,
          itemStatus: "sold",
        },
        {
          where: {
            id: req.body.itemsIDs,
          },
        }
      );
      logger.info(`Updated items: ${updatedReceipts}`);
      return res.status(201).json({
        status: "success",
        orderID: orderID,
      });
    }
    return res.status(400).json({
      status: "error",
      error: {
        message: "Tried to update non-existing item",
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

export default postOrder;
