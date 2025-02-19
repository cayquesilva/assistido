import { inArray } from "drizzle-orm";
import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/client";

export async function getRanking() {
	//busco um range de 0 a 2 (os 3 primeiros) no ranking da lista referral:ranking, com a pontuação
	const ranking = await redis.zrevrange("referral:ranking", 0, 2, "WITHSCORES");

	//criar objeto
	const subscriberIdAndScore: Record<string, number> = {};

	//percorrer o array retornado pegando somente usuários e a lista tem a seguinte construção: ['iduser':pontuação,'iduser':pontuação,...]
	for (let i = 0; i < ranking.length; i += 2) {
		subscriberIdAndScore[ranking[i]] = Number.parseInt(ranking[i + 1]);
	}

	const subscribers = await db
		.select()
		.from(subscriptions)
		.where(inArray(subscriptions.id, Object.keys(subscriberIdAndScore)));
	//object.keys() retorna o userId, pois no arrau está selecionando a key que é ['key':pontuacao]

	//percorre o rankingWithScore para retornar os itens com os dados do banco postgres e do Redis e ordeno com o sort, por usar coisas do postgres e atrapalhar o ranking
	const rankingWithScore = subscribers
		.map((subscriber) => {
			return {
				id: subscriber.id,
				name: subscriber.name,
				score: subscriberIdAndScore[subscriber.id],
			};
		})
		.sort((subscriber1, subscriber2) => {
			return subscriber2.score - subscriber1.score;
		});

	return { rankingWithScore };
}
