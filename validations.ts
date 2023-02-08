import { Request } from 'express'
import { body, ValidationChain } from 'express-validator'
import {
  FIELD_IS_REQUIRED,
  INCORRECT_COLOR,
  INCORRECT_EMAIL,
  INCORRECT_EMAIL_OR_PASSWORD,
  INCORRECT_FIELD_TYPE,
  INCORRECT_FIRST_NAME_MAX_LENGTH,
  INCORRECT_FIRST_NAME_MIN_LENGTH,
  INCORRECT_LAST_NAME_MAX_LENGTH,
  INCORRECT_LAST_NAME_MIN_LENGTH,
  INCORRECT_LIST_NAME_MAX_LENGTH,
  INCORRECT_LIST_NAME_MIN_LENGTH,
  INCORRECT_OLD_PASSWORD,
  INCORRECT_PASSWORD_CONFIRMATION,
  INCORRECT_PASSWORD_MAX_LENGTH,
  INCORRECT_PASSWORD_MIN_LENGTH,
  INCORRECT_TASK_NAME_MAX_LENGTH,
  INCORRECT_TASK_NAME_MIN_LENGTH,
} from './errorMessages'
import validateDbId from './utils/validateDbId'
import validator from './validator'

export const registrationValidation = addValidator([
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
])

export const loginValidation = addValidator([
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
])

export const updateNameValidation = addValidator([
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
])

export const updatePasswordValidation = addValidator([
  body('oldPassword')
    .exists()
    .withMessage(INCORRECT_OLD_PASSWORD)
    .bail()
    .isString()
    .withMessage(INCORRECT_OLD_PASSWORD)
    .bail()
    .isLength({ min: 6 })
    .withMessage(INCORRECT_OLD_PASSWORD)
    .bail()
    .isLength({ max: 80 })
    .withMessage(INCORRECT_OLD_PASSWORD),
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
])
export const createTaskValidation = addValidator([
  body('name')
    .exists()
    .withMessage(FIELD_IS_REQUIRED)
    .bail()
    .isString()
    .withMessage(INCORRECT_FIELD_TYPE)
    .bail()
    .isLength({ min: 1 })
    .withMessage(INCORRECT_TASK_NAME_MIN_LENGTH)
    .bail()
    .isLength({ max: 300 })
    .withMessage(INCORRECT_TASK_NAME_MAX_LENGTH),
  body('description')
    .optional()
    .isString()
    .withMessage(INCORRECT_FIELD_TYPE)
    .bail()
    .isLength({ min: 1 })
    .withMessage(INCORRECT_TASK_NAME_MIN_LENGTH)
    .bail()
    .isLength({ max: 2000 })
    .withMessage(INCORRECT_TASK_NAME_MAX_LENGTH),
  body('list')
    .optional()
    .isString()
    .withMessage(INCORRECT_FIELD_TYPE)
    .bail()
    .custom(validateDbId)
    .withMessage(INCORRECT_FIELD_TYPE),
  body('date').optional().isString().withMessage(INCORRECT_FIELD_TYPE),
  body('tags')
    .optional()
    .isArray()
    .withMessage(INCORRECT_FIELD_TYPE)
    .bail()
    .custom((value: any) => {
      if (Array.isArray(value)) {
        if (!value.length) return true
        return value.every((item) => typeof item === 'string')
      } else {
        return false
      }
    })
    .withMessage(INCORRECT_FIELD_TYPE),
])

export const updateTaskValidation = addValidator([
  body('name')
    .exists()
    .withMessage(FIELD_IS_REQUIRED)
    .bail()
    .isString()
    .withMessage(INCORRECT_FIELD_TYPE)
    .bail()
    .isLength({ min: 1 })
    .withMessage(INCORRECT_TASK_NAME_MIN_LENGTH)
    .bail()
    .isLength({ max: 300 })
    .withMessage(INCORRECT_TASK_NAME_MAX_LENGTH),
  body('description')
    .optional()
    .isString()
    .withMessage(INCORRECT_FIELD_TYPE)
    .bail()
    .isLength({ min: 1 })
    .withMessage(INCORRECT_TASK_NAME_MIN_LENGTH)
    .bail()
    .isLength({ max: 2000 })
    .withMessage(INCORRECT_TASK_NAME_MAX_LENGTH),
  body('list')
    .optional()
    .isString()
    .withMessage(INCORRECT_FIELD_TYPE)
    .bail()
    .custom(validateDbId)
    .withMessage(INCORRECT_FIELD_TYPE),
  body('date').optional().isString().withMessage(INCORRECT_FIELD_TYPE),
  body('tags')
    .optional()
    .isArray()
    .withMessage(INCORRECT_FIELD_TYPE)
    .bail()
    .custom((value: any) => {
      if (Array.isArray(value)) {
        if (!value.length) return true
        return value.every((item) => typeof item === 'string')
      } else {
        return false
      }
    })
    .withMessage(INCORRECT_FIELD_TYPE),
])

export const createListValidation = addValidator([
  body('name')
    .exists()
    .withMessage(INCORRECT_LIST_NAME_MIN_LENGTH)
    .bail()
    .isString()
    .withMessage(INCORRECT_FIELD_TYPE)
    .bail()
    .isLength({ min: 1 })
    .withMessage(INCORRECT_LIST_NAME_MIN_LENGTH)
    .bail()
    .isLength({ max: 100 })
    .withMessage(INCORRECT_LIST_NAME_MAX_LENGTH),
])

export const updateListValidation = addValidator([
  body('name')
    .exists()
    .withMessage(INCORRECT_LIST_NAME_MIN_LENGTH)
    .bail()
    .isString()
    .withMessage(INCORRECT_FIELD_TYPE)
    .bail()
    .isLength({ min: 1 })
    .withMessage(INCORRECT_LIST_NAME_MIN_LENGTH)
    .bail()
    .isLength({ max: 100 })
    .withMessage(INCORRECT_LIST_NAME_MAX_LENGTH),
  body('color')
    .exists()
    .withMessage(INCORRECT_COLOR)
    .bail()
    .isString()
    .withMessage(INCORRECT_COLOR)
    .bail()
    .isLength({ min: 7, max: 7 })
    .withMessage(INCORRECT_COLOR)
    .bail()
    .custom((value: string) => value.charAt(0) === '#')
    .withMessage(INCORRECT_COLOR),
])

function addValidator(funcs: ValidationChain[]) {
  return [...funcs, validator]
}
