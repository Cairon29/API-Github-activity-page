import { type Request, type Response } from "express"
import { RepoModel } from "./model.ts"

export class RepoController {
    static async getRepo(req: Request, res: Response) {
        const { userName } = req.params

        if (!userName) {
            return res.status(400).json({ error: 'Owner name is required' })
        }

        const { data, status } = await RepoModel.getRepo(userName)
        res.status(status).json(data)
    }
}