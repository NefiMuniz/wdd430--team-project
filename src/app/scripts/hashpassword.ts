
import 'dotenv/config';
import { hash } from 'bcryptjs';
import { sql } from '@/lib/db';

async function main() {
    // Verify if the variable is loaded
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL not defined at .env');
    }

    const users = await sql`SELECT id, password FROM users`;

    for (const user of users) {
        if (!user.password.startsWith('$2a$')) {
            const hashed = await hash(user.password, 12);
            await sql`UPDATE users SET password = ${hashed} WHERE id = ${user.id}`;
            console.log(`✅ Password updated for ID ${user.id}`);
        }
    }
}

main().catch(console.error);