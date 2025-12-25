import { type Request, type Response } from "express"

export class AuthController {
    static async login(req: Request, res: Response) {
        const { user, password } = req.body
        // const response =  await UserModel.getStats(userName)
        console.log(user, password);
        
        let response = 'Backend got the info'
        res.json(response)
    }
}