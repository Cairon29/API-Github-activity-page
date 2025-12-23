import { Router } from 'express'
import { RepoController } from './controller.ts'

export const RepoRouter = Router()

RepoRouter.get('/:userName', RepoController.getRepo)
