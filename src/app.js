import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { MongoClient } from "mongodb"
import Joi from "joi"
import bcrypt from "bcrypt"

// Criação do app
const app = express()

// Confirgurações
app.use(cors())
app.use(express.json())
dotenv.config()

// Conexão com o Banco
const mongoClient = new MongoClient(process.env.DATABASE_URL)
try {
    await mongoClient.connect()
    console.log("Mongodb conectado")
} catch (err) {
    console.log(err.message)
}

const db = mongoClient.db()

// Schemas
const schemaCadastro = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
})

const schemaLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
})

// Endpoints
app.post("/cadastro", async (req, res) => {
    const { name, email, password } = req.body

    const validation = schemaCadastro.validate(req.body, { abortEarly: false })

    if (validation.error) {
        return res.status(422).send(validation.error.details.map(detail => detail.message))
    }

    try {
        const user = await db.collection("users").findOne({ email })
        if (user) {
            return res.status(409).send("Email já cadastrado")
        }
        const passwordHash = bcrypt.hashSync(password, 10)

        await db.collection("users").insertOne({ name, email, password: passwordHash })
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
})


// Ligar a aplicação do servidor para ouvir requisições
const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
