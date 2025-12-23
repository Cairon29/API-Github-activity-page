import { type Request, type Response } from "express"

export class AuthController {
    static async login(req: Request, res: Response) {
        const { userName, password } = req.body
        // const response =  await UserModel.getStats(userName)
        let response = 'test'
        res.json(response)
    }
}