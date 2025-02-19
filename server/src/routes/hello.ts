//criando rota
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const helloTestRoute: FastifyPluginAsyncZod = async (app) => {
	app.get("/hello", () => {
		return "Hello World!";
	});
};
