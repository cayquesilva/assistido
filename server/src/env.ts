import { z } from 'zod'

//criando o padrão da porta no documento .env para evitar erros
const envSchema = z.object({
    //coerce vai tentar transformar para number, caso nao seja passado nada, usa a 3333
    PORT: z.coerce.number().default(3333),
})

export const env = envSchema.parse(process.env)