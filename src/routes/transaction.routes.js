import { Router } from "express"

const transactionRouter = Router()

transactionRouter.post("/nova-transacao")
transactionRouter.get("/home")

//checar nomes das rotas

export default transactionRouter