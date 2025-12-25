import express, { type Request, type Response }  from 'express';
import { api_router } from './modules/interface.ts';
// @ts-ignore
import cors from 'cors';

const app = express()
const PORT = Number(process.env.PORT) || 5555

app.disable('x-powered-by')
app.use(express.json())
app.use(cors({
    origin: (
        origin: string | undefined, 
        callback: (
            err: Error | null, 
            allow?: boolean
        ) => void
    ) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:1111',
            'https://UrCommit.com',
        ];
            // ↓ this is a way of validating if the origin is in the allowed list
        if (origin && ACCEPTED_ORIGINS.indexOf(origin) !== -1) {
            return callback(null, true)
        }
            // ↓ This is another way to validate
        // if (ACCEPTED_ORIGINS.includes(origin)) {
        //     return callback(null, true)
        // }

        if (!origin) {
            return callback(null, true)
        }
      
        return callback(new Error('Not allowed by CORS'))
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
app.use('/api', api_router)

app.get("/", (req: Request, res: Response) => {
    res.json({ response: "Github activity page 100% operational" });
})

app.listen(PORT, () => {
    console.log(`URL project: http://localhost:${PORT}`);
})
