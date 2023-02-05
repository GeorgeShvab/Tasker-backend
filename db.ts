import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({
  path: '.env.local',
})

const mongoDbUrl = process.env.MONGO_DB_URL

if (!mongoDbUrl)
  throw new Error("Немає посилання для з'єднання з MongoDb Atlas")

const db = mongoose.connect(mongoDbUrl, {
  dbName: 'developing',
})

export default db
