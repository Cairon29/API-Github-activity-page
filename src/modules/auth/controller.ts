import { type Request, type Response } from "express"
import { AuthModel } from "./model.ts"

export class AuthController {
    static async signup(req: Request, res: Response) {
        const { email, phone, github_username, fullname, supabase_id } = req.body

        if (!supabase_id) {
            res.status(400).json({ message: 'Supabase ID is required' })
            return
        }

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            res.status(400).json({ message: 'Invalid email format' })
            return
        }

        const { data, status } =  await AuthModel.signup({ email, phone, github_username, fullname, supabase_id })
        res.json(data).status(status)
    }
}