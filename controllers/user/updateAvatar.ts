import { Request, Response } from 'express'
import {
  FILE_EXTENSION_ERROR,
  FILE_SIZE_ERROR,
  SERVER_ERROR,
  UNDEFINED_FILE_ERROR,
} from '../../errorMessages'
import dotenv from 'dotenv'
import multer, { MulterError } from 'multer'
import fs from 'fs'
import path from 'path'
import genId from '../../utils/genId'
import sharp from 'sharp'
import User from '../../models/User'

dotenv.config()

const SERVER_ADDRESS: string | undefined = process.env.SERVER_ADDRESS

if (!SERVER_ADDRESS) throw new Error('Немає адреси сервера')

type StorageCallback = (error: Error | null, destination: string) => void

const storage = multer.diskStorage({
  destination(
    req: Request,
    file: Express.Multer.File,
    callback: StorageCallback
  ) {
    if (!fs.existsSync(path.join(__dirname, '../../', 'static'))) {
      fs.mkdirSync(path.join(__dirname, '../../', 'static'))
    }
    if (!fs.existsSync(path.join(__dirname, '../../', 'static', 'uploads'))) {
      fs.mkdirSync(path.join(__dirname, '../../', 'static', 'uploads'))
    }
    if (
      !fs.existsSync(
        path.join(__dirname, '../../', 'static', 'uploads', 'users')
      )
    ) {
      fs.mkdirSync(path.join(__dirname, '../../', 'static', 'uploads', 'users'))
    }

    callback(null, path.join(__dirname, '../../', 'static', 'uploads', 'users'))
  },
  filename(req: Request, file: Express.Multer.File, callback: StorageCallback) {
    callback(null, genId() + path.extname(file.originalname))
  },
})

class FileExtentionError extends Error {}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 20, fieldNameSize: 300 },
  fileFilter(req, file, callback) {
    const ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      callback(new FileExtentionError())
    }

    callback(null, true)
  },
}).single('image')

const updateAvatar = (req: Request, res: Response) => {
  try {
    const uploadCallback = async (e: any) => {
      if (e) {
        if (e instanceof FileExtentionError) {
          return res.status(400).json({
            errors: [{ msg: FILE_EXTENSION_ERROR }],
          })
        }
        if (e instanceof MulterError && e.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ errors: [{ msg: FILE_SIZE_ERROR }] })
        }

        return res.status(400).json({ errors: [{ msg: UNDEFINED_FILE_ERROR }] })
      }

      if (!req.file) {
        return res.status(400).json({ errors: [{ msg: UNDEFINED_FILE_ERROR }] })
      }

      const newId: string = genId(15) + path.extname(req.file.filename)

      if (path.extname(req.file.filename) === '.png') {
        await sharp(req.file.path)
          .resize({ width: 750, withoutEnlargement: true })
          .png()
          .withMetadata()
          .toFile(path.resolve(req.file.destination, newId))
        fs.unlink(req.file.path, () => {})
      } else {
        await sharp(req.file.path)
          .resize({ width: 750, withoutEnlargement: true })
          .jpeg()
          .withMetadata()
          .toFile(path.resolve(req.file.destination, newId))
        fs.unlink(req.file.path, () => {})
      }

      await User.updateOne(
        {
          _id: req.user,
        },
        {
          avatar: new URL('static/uploads/users/' + newId, SERVER_ADDRESS),
        }
      )

      return res.status(200).json({
        data: new URL('static/uploads/users/' + newId, SERVER_ADDRESS),
      })
    }

    upload(req, res, uploadCallback)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ errors: [{ msg: SERVER_ERROR }] })
  }
}

export default updateAvatar
