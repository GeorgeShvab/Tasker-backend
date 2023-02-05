import { Router } from 'express'
import registration from './controllers/user/registration'
import { registrationValidation } from './validations'
import validator from './validator'

const routes = require('./routes.json')

const router = Router()

router.post(
  '/api/registration',
  registrationValidation,
  validator,
  registration
)

export default router
