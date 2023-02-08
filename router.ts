import { Router } from 'express'
import refreshTokens from './controllers/refreshTokens'
import login from './controllers/user/login'
import registration from './controllers/user/registration'
import authorization from './middleware/authorization'
import protection from './middleware/protection'
import {
  loginValidation,
  registrationValidation,
  createTaskValidation,
  updateNameValidation,
  updatePasswordValidation,
  updateTaskValidation,
} from './validations'
import express from 'express'
import path from 'path'
import updateAvatar from './controllers/user/updateAvatar'
import updateName from './controllers/user/updateName'
import updatePassword from './controllers/user/updatePassword'
import changeMode from './controllers/user/changeMode'
import getMe from './controllers/user/getMe'
import createTask from './controllers/task/create'
import updateTask from './controllers/task/update'
import toggleCompletion from './controllers/task/toggleCompletion'
import deleteTask from './controllers/task/delete'
import getTasks from './controllers/task/getTasks'

const routes = require('./routes.json')

const router = Router()

router.use('/static', express.static(path.join(__dirname, 'static')))
router.use(authorization)
router.use(routes.protected, protection)

router.post('/api/registration', registrationValidation, registration)

router.post('/api/login', loginValidation, login)

router.post('/api/refresh-tokens', refreshTokens)

router.post('/api/user/update/avatar', updateAvatar)
router.patch('/api/user/update/name', updateNameValidation, updateName)
router.patch(
  '/api/user/update/password',
  updatePasswordValidation,
  updatePassword
)
router.patch('/api/user/update/mode', changeMode)
router.get('/api/user/get-me', getMe)

router.post('/api/task', createTaskValidation, createTask)
router.patch('/api/task/:id', updateTaskValidation, updateTask)
router.patch('/api/task/:id/complete', toggleCompletion)
router.delete('/api/task/:id', deleteTask)
router.get('/api/tasks', getTasks)

export default router
