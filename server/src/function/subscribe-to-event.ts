import { eq } from "drizzle-orm";
import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";

//inteface para garantir os parametros corretos
interface SubscribeToEventParams {
	name: string;
	email: string;
}

//criando função asyncrona para passagem de parametros e cadastro
export async function subscribeToEvent({
	name,
	email,
}: SubscribeToEventParams) {
	//pesquisar email do user, pois ele é único
	//usando drizzle, temos algumas funções pro where: eq = equal gt = greater then e por ai vai... parece com react
	const subscribers = await db
		.select()
		.from(subscriptions)
		.where(eq(subscriptions.email, email));

	//se existir algum inscrito com ese email, ele retorna o id. e reaproveita o user, não cria um novo...
	if (subscribers.length > 0) {
		return { subscriberId: subscribers[0].id };
	}

	//criando objeto para armazenar os dados no banco
	const result = await db
		.insert(subscriptions)
		.values({
			name,
			email,
		})
		.returning();

	const subscriber = result[0];

	return {
		subscriberId: subscriber.id,
	};
}
