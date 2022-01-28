import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;
interface RouteParams {
    coinId: string;
}

interface RouteState {
    name: string;
}
export interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    contract: string;
    platform: string;
    contracts: Contract[];
    parent: Parent;
    tags: Tag[];
    team: Team[];
    description: string;
    message: string;
    open_source: boolean;
    started_at: Date;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: Links;
    links_extended: LinksExtended[];
    whitepaper: Whitepaper;
    first_data_at: Date;
    last_data_at: Date;
}

export interface Contract {
    contract: string;
    platform: string;
    type: string;
}

export interface Links {
    explorer: string[];
    facebook: string[];
    reddit: string[];
    source_code: string[];
    website: string[];
    youtube: string[];
}

export interface LinksExtended {
    url: string;
    type: string;
    stats?: Stats;
}

export interface Stats {
    subscribers?: number;
    contributors?: number;
    stars?: number;
    followers?: number;
}

export interface Parent {
    id: string;
    name: string;
    symbol: string;
}

export interface Tag {
    id: string;
    name: string;
    coin_counter: number;
    ico_counter: number;
}

export interface Team {
    id: string;
    name: string;
    position: string;
}

export interface Whitepaper {
    link: string;
    thumbnail: string;
}

export interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: Date;
    last_updated: Date;
    quotes: Quotes;
}

export interface Quotes {
    USD: Usd;
}

export interface Usd {
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_15m: number;
    percent_change_30m: number;
    percent_change_1h: number;
    percent_change_6h: number;
    percent_change_12h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    percent_change_1y: number;
    ath_price: number;
    ath_date: Date;
    percent_from_price_ath: number;
}

const Coin = () => {
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();
    const { coinId } = useParams<RouteParams>();
    const { state } = useLocation<RouteState>();

    useEffect(() => {
        (async () => {
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();

            setInfo(infoData);
            setPriceInfo(priceData);
        })();
    }, []);

    return (
        <Container>
            <Header>
                <Title>{state?.name || 'Loading...'}</Title>
            </Header>
            {loading ? <Loader>Loading...</Loader> : null}
        </Container>
    );
};

export default Coin;
