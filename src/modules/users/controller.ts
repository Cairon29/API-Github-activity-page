import { type Request, type Response } from 'express';
import { UserModel } from './model.ts';

export class UserController {

    static async getUserGithub(req: Request, res: Response) {
        const { userName } = req.params
        const response = await UserModel.getUserGithub(userName)
        res.json(response)
    }

    static async getStats(req: Request, res: Response) {
        const { userName } = req.params
        // const response =  await UserModel.getStats(userName)
        let response = 'test'
        res.json(response)
    }

    static async getAllUsers(req: Request, res: Response) {
        const response = await UserModel.getAllUsers()
        res.json(response)
    }

    static async getUser(req: Request, res: Response) {
        const { id, supabase_uid } = req.query
        const response = await UserModel.getUser(id?.toString() || '', supabase_uid?.toString() || '')
        res.json(response)
    }

    static async deleteUser(req: Request, res: Response) {
        const { id, supabase_uid } = req.query

        if (!id && !supabase_uid) {
            return res.status(400).json({ error: 'A valid identifier must be provided' })
        }

        const response = await UserModel.deleteUser(id?.toString() || '', supabase_uid?.toString() || '')
        res.json(response)
    }
}