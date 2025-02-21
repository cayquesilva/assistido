"use client";
import { Button } from "@/components/button";
import { InputField, InputIcon, InputRoot } from "@/components/input";
import { postSubscriptions } from "@/http/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const subscriptionSchema = z.object({
	name: z.string().min(2, "Digite seu nome completo..."),
	email: z.string().email("Digite um e-mail válido..."),
});

type SubscriptionSchema = z.infer<typeof subscriptionSchema>;

export default function SubscriptionForm() {
	//navegação
	const router = useRouter();
	//recupera os parametros passados ao clicar no link de invite... pagina inicial com paremetro referer
	const searchParams = useSearchParams();

	//biblioteca do react hook form para melhorar uso de forms com uso de zod para validação
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SubscriptionSchema>({
		resolver: zodResolver(subscriptionSchema),
	});

	async function onSubscribe({ name, email }: SubscriptionSchema) {
		//recebendo o parametro passado ao clicar em cadastrar [parametro recebido quando usado o link de invite...]
		const referrer = searchParams.get("referrer");

		//usando orval para criar funções fetch de forma automatizada
		const { subscriberId } = await postSubscriptions({
			name,
			email,
			referrer,
		});

		//redireciona para a página invite usando o subscriber id recebido pelo post
		router.push(`/invite/${subscriberId}`);
	}

	return (
		<form
			onSubmit={handleSubmit(onSubscribe)}
			className="bg-gray-700 border border-gray-700 rounded-2xl p-8 space-y-6 w-full md:max-w-[440px]"
		>
			<h2 className="font-heading font-semibold text-gray-200 text-xl">
				Inscrição
			</h2>

			<div className="space-y-3">
				<div className="space-y-2">
					<InputRoot error={!!errors.name}>
						<InputIcon>
							<User />
						</InputIcon>
						<InputField
							type="text"
							placeholder="Nome completo..."
							{...register("name")}
						/>
					</InputRoot>

					{errors.name && (
						<p className="text-danger text-xs font-semibold">
							{errors.name.message}
						</p>
					)}
				</div>

				<div className="space-y-2">
					<InputRoot error={!!errors.email}>
						<InputIcon>
							<Mail />
						</InputIcon>
						<InputField
							type="email"
							placeholder="E-mail..."
							{...register("email")}
						/>
					</InputRoot>

					{errors.email && (
						<p className="text-danger text-xs font-semibold">
							{errors.email.message}
						</p>
					)}
				</div>
			</div>

			<Button type="submit">
				Confirmar
				<ArrowRight />
			</Button>
		</form>
	);
}
