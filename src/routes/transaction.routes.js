import { Router } from "express"
import { addTransaction, getTransaction } from "../controllers/transaction.controller.js"
import { auth } from "../middlewares/auth.middleware.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { schemaTransactions } from "../schemas/transaction.schema.js"

const transactionRouter = Router()

transactionRouter.post("/nova-transacao", auth(), validateSchema(schemaTransactions), addTransaction)
transactionRouter.get("/home", auth(), getTransaction)



export default transactionRouter