import { Button } from "@/components/button";
import { IconButton } from "@/components/incon-button";
import { InputField, InputIcon, InputRoot } from "@/components/input";
import { ArrowRight, Copy, Mail } from "lucide-react";

export default function Home() {
	return (
		<>
			<Button type="submit">
				Enviar
				<ArrowRight />
			</Button>
			<IconButton>
				<Copy />
			</IconButton>

			<div>
				<InputRoot>
					<InputIcon>
						<Mail />
					</InputIcon>
					<InputField />
				</InputRoot>
			</div>
		</>
	);
}
