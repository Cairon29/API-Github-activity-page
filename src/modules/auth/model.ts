import type { SignupRequest } from '../../types/types.ts'
import { pool } from '../../db.js'

export class AuthModel {
    static async signup({ email, phone, github_username, fullname, supabase_id, profile_picture }: SignupRequest) {

        // console.log('Signup request:', { email, phone, github_username, fullname, supabase_id, profile_picture })

        const user_query = 'SELECT * FROM users WHERE supabase_uid = ? OR email = ?'
        const user_values = [supabase_id, email]

        // Check if user already exists
        try {
            const [user_rows] = await pool.query(user_query, user_values)
            if (Array.isArray(user_rows) && user_rows.length > 0) {
                return {
                    data: { message: 'User already exists' },
                    status: 200
                }
            }
        } catch (error) {
            console.error('Error checking user:', error)
            return {
                data: { error: 'Error checking user' },
                status: 500
            }
        }

        // Insert new user
        const query = "INSERT INTO users (email, phone, github_username, fullname, supabase_uid, profile_picture) VALUES (?, ?, ?, ?, ?, ?)"
        const values = [email, phone, github_username, fullname, supabase_id, profile_picture]

        const conn = await pool.getConnection()
        try {
            await conn.beginTransaction()
            await conn.query(query, values)
            await conn.commit()

            return {
                data: { message: `Signup successful. User: ${supabase_id}` },
                status: 200
            }
        } catch (error) {
            await conn.rollback()
            console.error('Error signing up:', error)
            return {
                data: { error: `Error signing up. ${error}` },
                status: 500
            }
        } finally {
            conn.release()
        }
    }
}
