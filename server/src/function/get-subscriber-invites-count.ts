import { redis } from "../redis/client";

//inteface para garantir os parametros corretos
interface GetSubscriberInvitesCountParams {
    subscriberId: string;
}

//criando função asyncrona para receber os cliques nos links
export async function getSubscriberInvitesCount({
    subscriberId,
}: GetSubscriberInvitesCountParams) {
    //acessando o ReDIS para organização de dados CHAVE => VALOR
    //serve para listas [] hashes {} sorted sets [likes: number]

    //zscore trabalha com sorted sets, logo, ele usa um sistema de ranking (pontuação dentro do referral:ranking)
    const count = await redis.zscore("referral:ranking", subscriberId);

    //retorna 0 caso o count não tenha sido informado e muda de string pra numero...
    return { count: count ? Number.parseInt(count) : 0 };
}
