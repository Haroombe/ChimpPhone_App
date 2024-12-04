"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts (only runs on the client side)
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function CustomerPlanPieChart() {
    const [chartData, setChartData] = useState({
        series: [1],
        labels: ['No Data'],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/fetchCustomerByPlan');
                const result = await response.json();

                if (result.success && result.data.length > 0) {
                    const labels = result.data.map(plan => plan.plan_name);
                    const series = result.data.map(plan => Number(plan.total_customers));

                    setChartData({ labels, series });
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
            type: 'pie',
        },
        labels: chartData.labels,
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
                Customers by Phone Plan
            </h2>
            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <ApexCharts options={chartOptions} series={chartData.series} type="pie" height={400} />
            )}
        </div>
    );
}
