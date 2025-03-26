import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    INTERVAL: z.coerce.number().default(10000),
    PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error('❌ Invalid environment variables', _env.error.format())

    throw new Error('Invalid environment variables')
}

export const env = _env.data
