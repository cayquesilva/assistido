import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { env } from "../env";
import { accessinviteLink } from "../function/access-invite-link";
//criando outra rota, dessa vez para contar invites realizados / mudar depois para talvez checkins

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		//depois alterar para uma possível presença marcada
		"/invites/:subscriberId",
		{
			schema: {
				//summary descreve na documentação o que essa rota faz...
				summary:
					"[ENG]Access invite link and redirect user / [pt-BR]Acessa o link de invite e redireciona",
				//tags é uma lista de categorias que essa rota pertence
				tags: ["Referral"],
				//description é a descrição da rota
				description:
					"[ENG]Access invite link and redirect user / [pt-BR]Acessa o link de invite e redireciona",
				params: z.object({
					subscriberId: z.string(),
				}),
				//consigo usar a serialização para que o retorno seja ajustado conforme desejar, a depender do código de retorno.
				response: {
					201: z.object({
						subscriberId: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			//aqui eu posso criar uma inscrição, usando o body que foi passado, recuperando os dados passados no body
			const { subscriberId } = request.params;

			//chamo a função que salva / incrementa o clique no Redis
			await accessinviteLink({ subscriberId });

			const redirectURL = new URL(env.WEB_URL);

			//passo o subscriber id como parametro na url, para que o front possa pegar o user direitinho
			redirectURL.searchParams.set("referrer", subscriberId);

			//301 redirect permanente, 302 redirect temporario - no 301 o browser faz cache. 302 nao faz cache e conta mais de um clique...
			return reply.redirect(redirectURL.toString(), 302);
		},
	);
};
