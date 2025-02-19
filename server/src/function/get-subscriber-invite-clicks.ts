import { redis } from "../redis/client";

//inteface para garantir os parametros corretos
interface GetSubscriberInviteClicksParams {
	subscriberId: string;
}

//criando função asyncrona para receber os cliques nos links
export async function getSubscriberInviteClicks({
	subscriberId,
}: GetSubscriberInviteClicksParams) {
	//acessando o ReDIS para organização de dados CHAVE => VALOR
	//serve para listas [] hashes {} sorted sets [likes: number]

	//hget contabiliza quantos acessos o subscriberId teve no link mais precisamente "id, quantidade"
	const count = await redis.hget("referral:access-count", subscriberId);

	//retorna 0 caso o count não tenha sido informado e muda de string pra numero...
	return { count: count ? Number.parseInt(count) : 0 };
}
