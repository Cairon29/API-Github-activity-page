import { Router } from 'express'
import { UserController } from './controller.ts'

export const UserRouter = Router()

UserRouter.get('/', UserController.getUser)
UserRouter.get('/githubInfo/:userName', UserController.getUserGithub)
UserRouter.get('/stats/:userName', UserController.getStats)
UserRouter.get('/getAll', UserController.getAllUsers)
UserRouter.delete('/', UserController.deleteUser)