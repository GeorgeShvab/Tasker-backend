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
  createListValidation,
  updateListValidation,
  createTagValidation,
  updateTagValidation,
  createStickerValidation,
  updateStickerValidation,
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
import getTasksByTag from './controllers/task/getTasksByTag'
import createList from './controllers/list/create'
import deleteList from './controllers/list/delete'
import updateList from './controllers/list/update'
import createTag from './controllers/tag/create'
import deleteTag from './controllers/tag/delete'
import updateTag from './controllers/tag/update'
import getList from './controllers/list/get'
import getTasksByList from './controllers/task/getTasksByList'
import createSticker from './controllers/sticker/create'
import deleteSticker from './controllers/sticker/delete'
import updateSticker from './controllers/sticker/update'
import getStickers from './controllers/sticker/getStickers'
import logout from './controllers/user/logout'
import getLists from './controllers/list/getLists'
import getTags from './controllers/tag/getTags'
import getTag from './controllers/tag/getTag'

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

router.get('/api/tag/:id/tasks', getTasksByTag)

router.post('/api/list', createListValidation, createList)

router.delete('/api/list/:id', deleteList)
router.patch('/api/list/:id', updateListValidation, updateList)

router.post('/api/tag', createTagValidation, createTag)
router.delete('/api/tag/:id', deleteTag)
router.patch('/api/tag/:id', updateTagValidation, updateTag)
router.get('/api/list/:id', getList)
router.get('/api/lists', getLists)

router.get('/api/list/:id/tasks', getTasksByList)

router.post('/api/sticker', createStickerValidation, createSticker)
router.delete('/api/sticker/:id', deleteSticker)
router.patch('/api/sticker/:id', updateStickerValidation, updateSticker)
router.get('/api/stickers', getStickers)

router.post('/api/logout', logout)

router.get('/api/tags', getTags)
router.get('/api/tag/:id', getTag)

export default router
