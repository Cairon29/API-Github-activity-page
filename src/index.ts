import express, { type Request, type Response }  from 'express';
import { json } from 'stream/consumers';

const app = express()

const PORT = 5555

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send({"Github activity app currently starting": 1})
})

app.listen(PORT, () => {
    console.log(`running in port ${PORT}`);
})