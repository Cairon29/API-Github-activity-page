import { config } from './config.js';
import { api_router } from './modules/interface.ts';
import express, { type Request, type Response }  from 'express';
// @ts-ignore
import cors from 'cors';

const app = express()
const PORT = config.app.port || 5555

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
        if (ACCEPTED_ORIGINS.includes(origin || '')) {
            return callback(null, true)
        }

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
