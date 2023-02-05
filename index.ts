import mongoose from 'mongoose'
import express, { Express } from 'express'
import dotenv from 'dotenv'
import db from './db'
import cors from 'cors'
import router from './router'

dotenv.config()

const PORT: string | number = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' /*['localhost:3000', '192.168.31.166:3000']*/ }))
app.use(router)

db.then(() => {
  start()
}).catch((e) => {
  console.log('MongoDb Error')
  console.log(e)
})

function start() {
  app.listen(PORT, () => {
    console.log('Server started on port', PORT)
  })
}
