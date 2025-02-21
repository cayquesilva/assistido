import { getRanking } from "@/http/api";
import Image from "next/image";
import cooper from "../../../assets/medal-cooper.svg";
import gold from "../../../assets/medal-gold.svg";
import silver from "../../../assets/medal-silver.svg";

export default async function Ranking() {
	//buscando o ranking. função gerada no arquivo api do orval
	const { ranking } = await getRanking();
	return (
		<div className="w-full max-w-[440px] space-y-5">
			<h2 className="text-gray-200 text-xl font-heading font-semibold leading-none">
				Ranking de indicações
			</h2>

			<div className="space-y-4">
				{ranking.map((item, index) => {
					const rankingPosition = index + 1;
					const medals = [gold, silver, cooper];
					return (
						<div
							key={item.id}
							className="rounded-xl bg-gray-700 border border-gray-600 flex flex-col justify-center gap-3 p-6 relative"
						>
							<span className="text-sm text-gray-300 leading-none">
								<span className="font-semibold">{rankingPosition}º</span> |{" "}
								{item.name}
							</span>
							<span className="text-2xl font-heading font-semibold text-gray-200 leading-none">
								{item.score}
							</span>

							<Image
								src={medals[index]}
								alt={`${medals[index]} medal`}
								className="absolute top-0 right-8"
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
