import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { getSubscriberRankingPosition } from "../function/get-subscriber-ranking-position";
//criando outra rota, dessa vez para contar invites realizados / mudar depois para talvez checkins

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod = async (
	app,
) => {
	app.get(
		//rota que vai buscar pelo id
		"/subscribers/:subscriberId/ranking/position",
		{
			schema: {
				//summary descreve na documentação o que essa rota faz...
				summary:
					"[ENG]Get subscriber ranking position / [pt-BR]Retorna o ranking",
				//tags é uma lista de categorias que essa rota pertence
				tags: ["Referral"],
				//description é a descrição da rota
				description:
					"[ENG]Get subscriber ranking position / [pt-BR]Retorna o ranking",
				params: z.object({
					subscriberId: z.string(),
				}),
				//consigo usar a serialização para que o retorno seja ajustado conforme desejar, a depender do código de retorno.
				response: {
					200: z.object({
						position: z.number().nullable(),
					}),
				},
			},
		},
		async (request) => {
			const { subscriberId } = request.params;

			//chama função que conta cliques do link separados pelo subscriberID
			const { position } = await getSubscriberRankingPosition({ subscriberId });

			return { position };
		},
	);
};
