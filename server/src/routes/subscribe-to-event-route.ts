import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
//criando outra rota, dessa vez para criar inscrições usando POST

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/subscriptions",
		{
			//aqui eu posso passar um schema para validação usando zod
			schema: {
				//summary descreve na documentação o que essa rota faz...
				summary: "[ENG]Subscribe to an event / [pt-BR]Inscrever em um evento",
				//tags é uma lista de categorias que essa rota pertence
				tags: ["Subscriptions"],
				//description é a descrição da rota
				description:
					"[ENG]Subscribe to an event / [pt-BR]Inscrever em um evento!",
				//em uma api, temos o body que é o corpo da requisição, traz os dados do que está sendo criado ou alterado ex: usuario, etc...
				//o search params é geralmente o que é usado na busca/filtro por url por exemplo ?cor=azul&tamanho=p
				//o route params é quando usamos um parametro que não tem nome e é obrigatório, direto na rota exemplo: /users/1  o numero 1 é o parametro id
				body: z.object({
					name: z.string(),
					email: z.string().email(),
				}),
				//consigo usar a serialização para que o retorno seja ajustado conforme desejar, a depender do código de retorno.
				response: {
					201: z.object({
						name: z.string(),
						email: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			//aqui eu posso criar uma inscrição, usando o body que foi passado, recuperando os dados passados no body
			const { name, email } = request.body;

			//quando configurado, podemos aqui, criar a inserçao da inscrição no banco de dados...

			//reply serve pra devolver uma resposta personalizada depois de executar a ação de envio
			return reply.status(201).send({
				name,
				email,
			});
		},
	);
};
