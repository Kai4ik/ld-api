import Joi from "joi";

export const orderDataSchema = Joi.object().keys({
  id: Joi.string().uuid().required(),
  orderBy: Joi.string().email().required(),
  orderDate: Joi.date().required(),
});
