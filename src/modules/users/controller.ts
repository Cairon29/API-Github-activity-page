import { type Request, type Response } from 'express';
import { UserModel } from './model.ts';

export class UserController {

    static async getUser(req: Request, res: Response) {
        const { name } = req.params
        const response =  await UserModel.getUser(name)
        res.json(response)
    }

    static async getStats(req: Request, res: Response) {
        const { userName } = req.params
        // const response =  await UserModel.getStats(userName)
        let response = 'test'
        res.json(response)
    }
}