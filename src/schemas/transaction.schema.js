import Joi from "joi"

export const schemaTransactions = Joi.object({
    value: Joi.number().required(),
    description: Joi.string().required(),
    type: Joi.string().required().valid("entrada", "saida")
})