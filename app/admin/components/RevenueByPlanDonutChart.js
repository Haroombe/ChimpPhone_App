"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts (only runs on the client side)
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function RevenueByPlanDonutChart() {
    const [chartData, setChartData] = useState({
        series: [],
        labels: [],
    });

    const [totalRevenue, setTotalRevenue] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/fetchRevenueByPlan');
                const result = await response.json();

                if (result.success && result.data.length > 0) {
                    const labels = result.data.map(plan => plan.plan_name);
                    const series = result.data.map(plan => Number(plan.revenue));
                    const total = series.reduce((sum, value) => sum + value, 0);

                    setChartData({ labels, series });
                    setTotalRevenue(total);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const chartOptions = {
        chart: {
            type: 'donut',
        },
        labels: chartData.labels,
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: () => `$${totalRevenue.toFixed(2)}`,
                        },
                    },
                },
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 dark:bg-gray-800 w-full">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
                Revenue by Plan (Current Month)
            </h2>
            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <ApexCharts options={chartOptions} series={chartData.series} type="donut" height={400} />
            )}
        </div>
    );
}
