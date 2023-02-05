import { Router } from 'express'
import login from './controllers/user/login'
import registration from './controllers/user/registration'
import { loginValidation, registrationValidation } from './validations'
import validator from './validator'

const routes = require('./routes.json')

const router = Router()

router.post(
  '/api/registration',
  registrationValidation,
  validator,
  registration
)

router.post('/api/login', loginValidation, validator, login)

export default router
