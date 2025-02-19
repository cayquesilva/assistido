import { db } from "../drizzle/client"
import { subscriptions } from "../drizzle/schema/subscriptions"

//inteface para garantir os parametros corretos
interface SubscribeToEventParams{
    name: string
    email: string
}

//criando função asyncrona para passagem de parametros e cadastro
export async function subscribeToEvent({
    name,
    email,
}:SubscribeToEventParams) {
    //criando objeto para armazenar os dados no banco
    const result = await db.insert(subscriptions).values({
        name,
        email,
    }).returning()

    const subscriber = result[0]

    return {
        subscriberId: subscriber.id,
    }
}