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
      const month = new Date(created_at).toLocaleString('default', { month: 'long', year: 'numeric' });
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
  // Remove `chartData.datasets` from the dependency array to avoid warning
  }, [myCatches]); // Assuming myCatches is stable, doesn't change identity on each render

  return <Line data={chartData} />;
}

export default MyCatchesChart;
