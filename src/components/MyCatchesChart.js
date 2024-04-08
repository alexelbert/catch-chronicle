import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function MyCatchesChart({ myCatches }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Catches Per Month',
        data: [],
        borderColor: '#344e41',
        backgroundColor: '#344e41',
      },
    ],
  });

  useEffect(() => {
    const countsByMonth = myCatches.reduce((acc, { created_at }) => {
      const month = new Date(created_at).toLocaleString('default', { month: 'short', year: 'numeric' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(countsByMonth).sort((a, b) => new Date(a) - new Date(b));
    const data = labels.map(label => countsByMonth[label]);

    setChartData(prevChartData => ({
      ...prevChartData,
      labels,
      datasets: [
        {
          ...prevChartData.datasets[0],
          data,
        },
      ],
    }));
  }, [myCatches]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // Display only ints on the y-axis
          stepSize: 1,
          precision: 0,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        align: 'start',
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default MyCatchesChart;
