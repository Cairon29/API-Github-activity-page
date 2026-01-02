import { Octokit } from 'octokit'
import { pool } from '../../db.js'

export class UserModel {

    static base_url = 'https://api.github.com'
    static octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
    })

    static async getUserGithub(username: string) {
        const response = await fetch(`${this.base_url}/users/${username}`)
        if (!response.ok) {
            throw new Error('Failed to fetch GitHub user')
        }
        return response.json()
    }

    static async getAllUsers() {
        try {
            const [rows] = await pool.query('SELECT * FROM users')

            if (!Array.isArray(rows) || rows.length === 0) {
                return {
                    data: { error: 'No users found' },
                    status: 404
                }
            }

            return {
                data: rows,
                status: 200
            }
        } catch (error) {
            console.error('Error fetching users:', error)
            return {
                data: { error: 'Error fetching users' },
                status: 500
            }
        }
    }

    static async getUser(id?: string | '', supabase_uid?: string | '') {

        const query = id
            ? 'SELECT * FROM users WHERE id = ?'
            : 'SELECT * FROM users WHERE supabase_uid = ?'

        try {
            const [rows] = await pool.query(
                query,
                [id || supabase_uid]
            )

            if (!Array.isArray(rows) || rows.length === 0) {
                return {
                    data: { error: 'User not found' },
                    status: 404
                }
            }

            return {
                data: rows[0],
                status: 200
            }
        } catch (error) {
            console.error('Error fetching user:', error)
            return {
                data: { error: 'Error fetching user' },
                status: 500
            }
        }
    }

    static async deleteUser(id?: string | '', supabase_uid?: string | '') {

        const conn = await pool.getConnection()

        const query = id
            ? 'DELETE FROM users WHERE id = ?'
            : 'DELETE FROM users WHERE supabase_uid = ?'

        try {
            await conn.beginTransaction()

            const [result] = await conn.query(
                query,
                [id || supabase_uid]
            )

            if ((result as any).affectedRows === 0) {
                await conn.rollback()
                return {
                    data: { error: 'User not found' },
                    status: 404
                }
            }

            await conn.commit()
            return {
                data: { message: 'User deleted successfully' },
                status: 200
            }
        } catch (error) {
            await conn.rollback()
            console.error('Error deleting user:', error)
            return {
                data: { error: 'Error deleting user' },
                status: 500
            }
        } finally {
            conn.release()
        }
    }
}
