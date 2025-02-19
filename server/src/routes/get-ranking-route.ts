import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { getRanking } from "../function/get-ranking";
//criando outra rota, dessa vez para contar invites realizados / mudar depois para talvez checkins

export const getRankingRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		//rota que vai buscar pelo id
		"/ranking",
		{
			schema: {
				//summary descreve na documentação o que essa rota faz...
				summary: "[ENG]Get ranking / [pt-BR]Retorna o ranking",
				//tags é uma lista de categorias que essa rota pertence
				tags: ["Referral"],
				//description é a descrição da rota
				description: "[ENG]Get ranking / [pt-BR]Retorna o ranking",
				//consigo usar a serialização para que o retorno seja ajustado conforme desejar, a depender do código de retorno.
				response: {
					200: z.object({
						ranking: z.array(
							z.object({
								id: z.string(),
								name: z.string(),
								score: z.number(),
							}),
						),
					}),
				},
			},
		},
		async (request) => {
			//chama função que apresenta o ranking
			const { rankingWithScore } = await getRanking();

			return { ranking: rankingWithScore };
		},
	);
};
