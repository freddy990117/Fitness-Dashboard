import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// 初始化 chart.js plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
// 從 Card 接收的資料顯示在儀表上
const Chart = ({ chartData }) => {
  const data = {
    labels: chartData.inputDate,
    datasets: [
      {
        label: "Weight (kg)",
        data: chartData.inputWeight,
        borderColor: "#47b5ff",
        backgroundColor: "rgba(71, 181, 255, 0.3)",
        borderWidth: 6,
        Filler: true,
        tension: 0.6,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        backgroundColor: "#47b5ff",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: { display: false, grid: { display: false } },
      y: { display: false, grid: { display: false } },
    },
  };
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
