"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = () => {
  const ageGroupData = {
    labels: ["15-39", "40-49", "50-59", "60-69", "70-79", "80-99"],
    datasets: [
      {
        label: "Men",
        data: [35, 30, 25, 20, 15, 10],
        backgroundColor: "blue",
      },
      {
        label: "Women",
        data: [34, 29, 28, 22, 18, 12],
        backgroundColor: "pink",
      },
    ],
  };

  const ageGroupOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "5-Year Survival Rates by Age Group",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Survival Rate (%)",
        },
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: "Age Group",
        },
      },
    },
  };

  // Data for the second chart (5-Year Survival Rates by Cancer Stage)
  const cancerStageData = {
    labels: ["Localized", "Regional", "Distant"],
    datasets: [
      {
        label: "5-Year Survival Rates",
        data: [75, 40, 15],
        backgroundColor: "green",
      },
    ],
  };

  const cancerStageOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "5-Year Survival Rates by Cancer Stage",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Survival Rate (%)",
        },
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: "Cancer Stage",
        },
      },
    },
  };

  return (
    <div className="flex flex-row gap-6">
      {/* First Chart */}
      <div className="w-1/2 h-[400px]">
        <Bar data={ageGroupData} options={ageGroupOptions} />
      </div>

      {/* Second Chart */}
      <div className="w-1/2 h-[400px]">
        <Bar data={cancerStageData} options={cancerStageOptions} />
      </div>
    </div>
  );
};

export default Graph;