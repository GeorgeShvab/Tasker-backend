import { Router } from 'express'
import refreshTokens from './controllers/refreshTokens'
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

router.post('/api/refresh-tokens', refreshTokens)

export default router
