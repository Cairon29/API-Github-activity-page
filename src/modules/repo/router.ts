import { Router } from 'express'
import { RepoController } from './controller.ts'

export const RepoRouter = Router()

RepoRouter.get('/test', (req, res) => {
    res.json({ response: "Test successful" });
})
RepoRouter.get('/:userName', RepoController.getRepo)
