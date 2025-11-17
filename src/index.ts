import express, { type Request, type Response }  from 'express';
import { json } from 'stream/consumers';

const app = express()

const PORT = 5555

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    return "Here a main endpoint for the github page"
})

/*
    const id = req.params
    let { id_2 } = req.query;
    const { email, password } = req.body;
*/

app.get("/user/:name", async (req: Request, res: Response) => {
    res.send({"Github activity app currently starting": 1})
    const { name } = req.params

    const raw = await fetch(`https://api.github.com/users/${name}`)
    const data = await raw.json()
    console.log(data)
    return data
})

app.get("/repos", async (req: Request, res: Response)  => {
    const raw = await fetch('https://api.github.com/users/Cairon29/repos')
    const data = await raw.json()

    return data
})

app.listen(PORT, () => {
    console.log(`runn in port ${PORT} \n http://localhost:5555`);
})