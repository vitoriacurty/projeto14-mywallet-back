import { Router } from "express"
import transactionRouter from "./transaction.routes.js"
import userRouter from "./user.routes.js"

const router = Router()
router.use(userRouter)
router.use(transactionRouter)

export default router