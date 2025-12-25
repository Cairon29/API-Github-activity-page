import { Octokit } from 'octokit';

export class RepoModel {

    static base_url = 'https://api.github.com'
    static octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
    })

    static async getRepo(userName: string) {
        if (!userName) {
            return {
                data: { error: 'Owner name is required' },
                status: 400
            }
        }
        
        try {
            const data = await RepoModel.octokit.request(`GET /users/{username}/repos`, {
                username: userName,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            console.log(data);
            if (!data) {
                return {
                    data: { error: 'Repositories not found'},
                    status: 404
                }
            }

            return {
                data,
                status: 200
            }

        } catch (error) {
            return {
                data: { error: 'Error fetching the information'},
                status: 500
            }
        }
    }
}