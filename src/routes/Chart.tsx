import { useQuery } from 'react-query';
import ApexChart from 'react-apexcharts';
import { fetchCoinHistory } from 'api';

interface ChartProps {
    coinId: string;
}

interface IHistorical {
    time_open: Date;
    time_close: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

const Chart = ({ coinId }: ChartProps) => {
    const { isLoading, data } = useQuery<IHistorical[]>(
        ['ohlcv', coinId],
        () => fetchCoinHistory(coinId),
        { refetchInterval: 10000 },
    );

    return (
        <div>
            {isLoading ? (
                'Loading Chart...'
            ) : (
                <ApexChart
                    type='line'
                    series={[
                        {
                            name: 'price',
                            data: data?.map((price) => price.close),
                        },
                    ]}
                    options={{
                        theme: {
                            mode: 'dark',
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: 'transparent',
                        },
                        grid: {
                            show: false,
                        },
                        stroke: {
                            curve: 'smooth',
                            width: 4,
                        },
                        xaxis: {
                            labels: { show: false },
                            axisTicks: { show: false },
                            axisBorder: { show: false },
                            type: 'datetime',
                            categories: data?.map((price) => price.time_close),
                        },
                        yaxis: { show: false },
                        fill: {
                            type: 'gradient',
                            gradient: {
                                gradientToColors: ['#0be881'],
                                stops: [0, 100],
                            },
                        },
                        colors: ['#0fbcf9'],
                        tooltip: {
                            y: {
                                formatter: (value) => `$ ${value.toFixed(2)}`,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
};

export default Chart;
