import { Router } from 'express'
import refreshTokens from './controllers/refreshTokens'
import login from './controllers/user/login'
import registration from './controllers/user/registration'
import authorization from './middleware/authorization'
import protection from './middleware/protection'
import { loginValidation, registrationValidation } from './validations'
import validator from './validator'
import express from 'express'
import path from 'path'
import updateAvatar from './controllers/user/updateAvatar'

const routes = require('./routes.json')

const router = Router()

router.use('/static', express.static(path.join(__dirname, 'static')))
router.use(authorization)
router.use(routes.protected, protection)

router.post(
  '/api/registration',
  registrationValidation,
  validator,
  registration
)

router.post('/api/login', loginValidation, validator, login)

router.post('/api/refresh-tokens', refreshTokens)

router.post('/api/user/avatar', updateAvatar)

export default router
