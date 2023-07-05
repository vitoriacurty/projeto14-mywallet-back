import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { MongoClient } from "mongodb"

// Criação do app
const app = express()

// Confirgurações
app.use(cors())
app.use(express.json())
dotenv.config()

// Conexão com o Banco
const mongoClient = new MongoClient(process.env.DATABASE_URL)
try{
await mongoClient.connect()
console.log("Mongodb conectado")
}catch(err){
    console.log(err.message)
}

const db = mongoClient.db()



// Ligar a aplicação do servidor para ouvir requisições
const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
