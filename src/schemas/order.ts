import Joi from "joi";
import { itemDataSchema } from "./item.js";

export const orderDataSchema = Joi.object().keys({
  id: Joi.string().uuid(),
  orderBy: Joi.string().email().required(),
  orderDate: Joi.string().isoDate().required(),
  items: [itemDataSchema],
});
