import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
	type ZodTypeProvider,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "./env";
import { accessInviteLinkRoute } from "./routes/access-invite-link-route";
import { subscribeToEventRoute } from "./routes/subscribe-to-event-route";
import { getSubscriberInviteClicksRoute } from "./routes/get-subscriber-invite-clicks-route";
import { getSubscriberInvitesCountRoute } from "./routes/get-subscriber-invites-count-route";
import { getSubscriberRankingPositionRoute } from "./routes/get-subscriber-ranking-position-route";
import { getRankingRoute } from "./routes/get-ranking-route";

const app = fastify().withTypeProvider<ZodTypeProvider>();

//valida o formato da entrada de dados no endereço da rota [email, telefone, etc...]
app.setValidatorCompiler(validatorCompiler);
//transforma dados antes de enviar pro front-end
app.setSerializerCompiler(serializerCompiler);

//cors serve para permitir acessos a API a depender do que for passado
app.register(fastifyCors, {
	//origin, define quem pode acessar... deixndo true permite tudo
	//origin como http://localhost:3000 deixa somente nosso front acessar
	origin: true,
});

//swagger serve para documentação da API
app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Assistido API",
			version: "0.0.1",
		},
	},
	transform: jsonSchemaTransform,
});

//swagger ui serve para visualizar a documentação da API na roda /docs
app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

//rotas para funcionar no swagger tem de ser criadas em uma pasta/arquivo separado.
//nesse caso criamos uma pasta routes, com as rotas nela
//para chamar uma rota usamos o register
app.register(subscribeToEventRoute);
app.register(accessInviteLinkRoute);
app.register(getSubscriberInviteClicksRoute);
app.register(getSubscriberInvitesCountRoute);
app.register(getSubscriberRankingPositionRoute);
app.register(getRankingRoute);

//inicia o servidor, usando a variavel port no .env, passando por validação no arquivo env.ts
app.listen({ port: env.PORT }).then(() => {
	console.log("HTTP server: rodando!");
});
