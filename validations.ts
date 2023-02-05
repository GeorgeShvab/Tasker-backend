import { Request } from 'express'
import { body } from 'express-validator'
import {
  INCORRECT_EMAIL,
  INCORRECT_EMAIL_OR_PASSWORD,
  INCORRECT_FIRST_NAME_MAX_LENGTH,
  INCORRECT_FIRST_NAME_MIN_LENGTH,
  INCORRECT_LAST_NAME_MAX_LENGTH,
  INCORRECT_LAST_NAME_MIN_LENGTH,
  INCORRECT_PASSWORD_CONFIRMATION,
  INCORRECT_PASSWORD_MAX_LENGTH,
  INCORRECT_PASSWORD_MIN_LENGTH,
} from './errorMessages'

export const registrationValidation = [
  body('email')
    .exists()
    .withMessage(INCORRECT_EMAIL)
    .bail()
    .isString()
    .withMessage(INCORRECT_EMAIL)
    .bail()
    .isEmail()
    .withMessage(INCORRECT_EMAIL),
  body('firstName')
    .exists()
    .withMessage(INCORRECT_FIRST_NAME_MIN_LENGTH)
    .bail()
    .isString()
    .withMessage(INCORRECT_FIRST_NAME_MIN_LENGTH)
    .bail()
    .isLength({ min: 2 })
    .withMessage(INCORRECT_FIRST_NAME_MIN_LENGTH)
    .bail()
    .isLength({ max: 30 })
    .withMessage(INCORRECT_FIRST_NAME_MAX_LENGTH),
  body('lastName')
    .exists()
    .withMessage(INCORRECT_LAST_NAME_MIN_LENGTH)
    .bail()
    .isString()
    .withMessage(INCORRECT_LAST_NAME_MIN_LENGTH)
    .bail()
    .isLength({ min: 2 })
    .withMessage(INCORRECT_LAST_NAME_MIN_LENGTH)
    .bail()
    .isLength({ max: 30 })
    .withMessage(INCORRECT_LAST_NAME_MAX_LENGTH),
  body('password')
    .exists()
    .withMessage(INCORRECT_PASSWORD_MIN_LENGTH)
    .bail()
    .isString()
    .withMessage(INCORRECT_PASSWORD_MIN_LENGTH)
    .bail()
    .isLength({ min: 6 })
    .withMessage(INCORRECT_PASSWORD_MIN_LENGTH)
    .bail()
    .isLength({ max: 80 })
    .withMessage(INCORRECT_PASSWORD_MAX_LENGTH),
  body('passwordConfirmation')
    .exists()
    .withMessage(INCORRECT_PASSWORD_CONFIRMATION)
    .bail()
    .isString()
    .withMessage(INCORRECT_PASSWORD_CONFIRMATION)
    .bail()
    .custom(
      (value: string, { req }: { req: any }) => value === req.body.password
    )
    .withMessage(INCORRECT_PASSWORD_CONFIRMATION),
]

export const loginValidation = [
  body('password')
    .exists()
    .withMessage(INCORRECT_EMAIL_OR_PASSWORD)
    .isString()
    .withMessage(INCORRECT_EMAIL_OR_PASSWORD)
    .isLength({ min: 6, max: 80 })
    .withMessage(INCORRECT_EMAIL_OR_PASSWORD),
  body('email')
    .exists()
    .withMessage(INCORRECT_EMAIL_OR_PASSWORD)
    .isString()
    .withMessage(INCORRECT_EMAIL_OR_PASSWORD)
    .isEmail()
    .withMessage(INCORRECT_EMAIL_OR_PASSWORD),
]
