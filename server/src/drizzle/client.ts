import postgres from 'postgres'
import { env } from '../env'
import { drizzle } from 'drizzle-orm/postgres-js'
import { subscriptions } from './schema/subscriptions'

//configurando db
export const pg = postgres(env.POSTGRES_URL)

//criando tabela subscriptions com esquema preparado
export const db = drizzle(pg, {
    schema: {
        subscriptions,
    },
})