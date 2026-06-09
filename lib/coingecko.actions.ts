'use server';

import qs from 'query-string';

const BASE_URL = process.env.COINGECKO_BASE_URL as string;
const API_KEY = process.env.COINGECKO_API_KEY as string;

if (!BASE_URL) throw new Error('Could not get base url');
if (!API_KEY) throw new Error('Could not get api key');

export async function fetcher<T>(
    endpoint: string,
    params?: QueryParams,
    revalidate = 60,
): Promise<T> {
    const url = qs.stringifyUrl(
        {
            url: `${BASE_URL}/${endpoint}`,
            query: params,
        },
        { skipEmptyString: true, skipNull: true },
    );

    const apiKeyHeader = BASE_URL.includes('pro-api') ? 'x-cg-pro-api-key' : 'x-cg-demo-api-key';

    const response = await fetch(url, {
        headers: {
            [apiKeyHeader]: API_KEY,
            'Content-Type': 'application/json',
        } as Record<string, string>,
        next: { revalidate },
    });

    if (!response.ok) {
        const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}));

        throw new Error(`API Error: ${response.status}: ${JSON.stringify(errorBody)} `);
    }

    return response.json();
}

export async function getPools(
    id: string,
    network?: string | null,
    contractAddress?: string | null,
): Promise<PoolData> {
    const fallback: PoolData = {
        id: '',
        address: '',
        name: '',
        network: '',
    };

    if (network && contractAddress) {
        try {
            const poolData = await fetcher<{ data: PoolData[] }>(
                `/onchain/networks/${network}/tokens/${contractAddress}/pools`,
            );

            return poolData.data?.[0] ?? fallback;
        } catch (error) {
            console.log(error);
            return fallback;
        }
    }

    try {
        const poolData = await fetcher<{ data: PoolData[] }>('/onchain/search/pools', { query: id });

        return poolData.data?.[0] ?? fallback;
    } catch {
        return fallback;
    }
}

export async function searchCoins(query: string): Promise<SearchCoin[]> {
    try {
        const { coins } = await fetcher<{ coins: SearchCoin[] }>('/search', { query });
        
        const topCoins = coins.slice(0, 10);
        const coinIds = topCoins.map((c) => c.id).join(',');

        if (!coinIds) return [];

        const marketData = await fetcher<any[]>('/coins/markets', {
            vs_currency: 'usd',
            ids: coinIds,
        });

        return topCoins.map((coin) => {
            const market = marketData.find((m) => m.id === coin.id);
            return {
                ...coin,
                data: {
                    price: market?.current_price,
                    price_change_percentage_24h: market?.price_change_percentage_24h ?? 0,
                },
            };
        });
    } catch (error) {
        console.error('Error searching coins:', error);
        return [];
    }
}