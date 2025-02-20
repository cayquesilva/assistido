import Image from "next/image";
import cooper from "../../assets/medal-cooper.svg";
import gold from "../../assets/medal-gold.svg";
import silver from "../../assets/medal-silver.svg";

export default function Ranking() {
	return (
		<div className="w-full max-w-[440px] space-y-5">
			<h2 className="text-gray-200 text-xl font-heading font-semibold leading-none">
				Ranking de indicações
			</h2>

			<div className="space-y-4">
				<div className="rounded-xl bg-gray-700 border border-gray-600 flex flex-col justify-center gap-3 p-6 relative">
					<span className="text-sm text-gray-300 leading-none">
						<span className="font-semibold">1º</span> | Cayque Silva
					</span>
					<span className="text-2xl font-heading font-semibold text-gray-200 leading-none">
						1040
					</span>

					<Image
						src={gold}
						alt="Gold Medal"
						className="absolute top-0 right-8"
					/>
				</div>

				<div className="rounded-xl bg-gray-700 border border-gray-600 flex flex-col justify-center gap-3 p-6 relative">
					<span className="text-sm text-gray-300 leading-none">
						<span className="font-semibold">2º</span> | Manoel Gomes
					</span>
					<span className="text-2xl font-heading font-semibold text-gray-200 leading-none">
						724
					</span>

					<Image
						src={silver}
						alt="Silver Medal"
						className="absolute top-0 right-8"
					/>
				</div>

				<div className="rounded-xl bg-gray-700 border border-gray-600 flex flex-col justify-center gap-3 p-6 relative">
					<span className="text-sm text-gray-300 leading-none">
						<span className="font-semibold">3º</span> | Neil Armstrong
					</span>
					<span className="text-2xl font-heading font-semibold text-gray-200 leading-none">
						337
					</span>

					<Image
						src={cooper}
						alt="Cooper Medal"
						className="absolute top-0 right-8"
					/>
				</div>
			</div>
		</div>
	);
}
