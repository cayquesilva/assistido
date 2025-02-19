import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { getSubscriberInviteClicks } from "../function/get-subscriber-invite-clicks";
//criando outra rota, dessa vez para contar invites realizados / mudar depois para talvez checkins

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod = async (
	app,
) => {
	app.get(
		//rota que vai buscar pelo id
		"/subscribers/:subscriberId/ranking/clicks",
		{
			schema: {
				//summary descreve na documentação o que essa rota faz...
				summary:
					"[ENG]Get subscriber ranking invites / [pt-BR]Retorna numero de invites clicados",
				//tags é uma lista de categorias que essa rota pertence
				tags: ["Referral"],
				//description é a descrição da rota
				description:
					"[ENG]Get subscriber ranking invites / [pt-BR]Retorna numero de invites clicados",
				params: z.object({
					subscriberId: z.string(),
				}),
				//consigo usar a serialização para que o retorno seja ajustado conforme desejar, a depender do código de retorno.
				response: {
					200: z.object({
						count: z.number(),
					}),
				},
			},
		},
		async (request) => {
			const { subscriberId } = request.params;

			//chama função que conta cliques do link separados pelo subscriberID
			const { count } = await getSubscriberInviteClicks({ subscriberId });

			return { count };
		},
	);
};
