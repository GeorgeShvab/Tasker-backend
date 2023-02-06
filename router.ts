import { Router } from 'express'
import refreshTokens from './controllers/refreshTokens'
import login from './controllers/user/login'
import registration from './controllers/user/registration'
import authorization from './middleware/authorization'
import protection from './middleware/protection'
import {
  loginValidation,
  registrationValidation,
  updateNameValidation,
} from './validations'
import validator from './validator'
import express from 'express'
import path from 'path'
import updateAvatar from './controllers/user/updateAvatar'
import updateName from './controllers/user/updateName'

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

router.post('/api/user/update/avatar', updateAvatar)
router.patch(
  '/api/user/update/name',
  updateNameValidation,
  validator,
  updateName
)

export default router
