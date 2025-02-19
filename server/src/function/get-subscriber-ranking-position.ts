import { redis } from "../redis/client";

//inteface para garantir os parametros corretos
interface GetSubscriberRankingPositionParams {
	subscriberId: string;
}

//criando função asyncrona para receber os cliques nos links
export async function getSubscriberRankingPosition({
	subscriberId,
}: GetSubscriberRankingPositionParams) {
	//acessando o ReDIS para organização de dados CHAVE => VALOR
	//serve para listas [] hashes {} sorted sets [likes: number]

	//zrevrank determina a posição de um membro dentro do sorted set (posição dentro do referral:ranking)
	const rank = await redis.zrevrank("referral:ranking", subscriberId);

	//retorna null caso não esteja no ranking
	if (rank === null) {
		return { position: null };
	}

	//retorna a posição na lista depois de classificado. +1 porque estamos falando de indices em uma lista (inicia no 0)
	return { position: rank + 1 };
}
