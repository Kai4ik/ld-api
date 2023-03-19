import Joi from "joi";

export const itemDataSchema = Joi.object().keys({
  id: Joi.string().uuid().required(),
  itemTitle: Joi.string().min(5).required(),
  itemDescription: Joi.string().min(10).required(),
  itemPrice: Joi.number().positive().precision(2).required(),
  itemStatus: Joi.string().valid("sold", "on sale").lowercase().required(),
  soldBy: Joi.string().email().required(),
  boughtBy: Joi.string().email(),
  orderId: Joi.string().uuid(),
});
