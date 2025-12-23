import { Octokit } from 'octokit';

export class UserModel {

    static base_url = 'https://api.github.com'
    octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
    })
    
    static async getUser(name: string) {
        const raw = await fetch(`${UserModel.base_url}/users/${name}`)
        const data = await raw.json()
        return data
    }

}
