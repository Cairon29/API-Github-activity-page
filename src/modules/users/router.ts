import { Router } from 'express'
import { UserController } from './controller.ts'

export const UserRouter = Router()

UserRouter.get('/:userName', UserController.getUser)
UserRouter.get('/Stats/:userName', UserController.getStats)
