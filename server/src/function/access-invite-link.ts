import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/client";

//inteface para garantir os parametros corretos
interface AccessinviteLinkParams {
	subscriberId: string;
}

//criando função asyncrona para passagem de parametros e cadastro
export async function accessinviteLink({
	subscriberId,
}: AccessinviteLinkParams) {
	//acessando o ReDIS para organização de dados CHAVE => VALOR
	//serve para listas [] hashes {} sorted sets [likes: number]

	//hincrby incrementa a chave 'userID' com o valor 1... toda vez que acessa conta mais 1 no valor da chave[userID]
	await redis.hincrby("referral:access-count", subscriberId, 1);
}
