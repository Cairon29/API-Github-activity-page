import type { SignupRequest } from '../../types/types.ts'
import config from '../../config.js'
import { pool } from '../../db.js'


export class AuthModel {
    static async signup({ email, phone, github_username, fullname, supabase_id }: SignupRequest) {
        
        console.log('Signup request:', { email, phone, github_username, fullname, supabase_id })

        const user_query = 'SELECT * FROM users WHERE supabase_uid = ? OR email = ? OR github_username = ?'
        const user_values = [supabase_id, email, github_username]
        
        // Check if user already exists
        try {
            const [user_rows] = await pool.query(user_query, user_values)
            if (Array.isArray(user_rows) && user_rows.length > 0) {
                return {
                    data: { error: 'User already exists'},
                    status: 400
                }
            }
        } catch (error) {
            console.error('Error checking user:', error)
            return {
                data: { error: 'Error checking user'},
                status: 500 
            }
        }

        // Insert new user
        const query = 'INSERT INTO users    (email, phone, github_username, fullname, supabase_uid) VALUES (?, ?, ?, ?, ?)'
        const values = [email, phone, github_username, fullname, supabase_id]
        try {
            await pool.query('BEGIN')
            await pool.query(query, values)
            return {
                data: { message: `Signup successful. User: ${supabase_id}`},
                status: 200
            }
        } catch (error) {
            console.error('Error signing up:', error)
            await pool.query('ROLLBACK')
            return {
                data: { error: 'Error signing up'},
                status: 500
            }
        }
    }
}
