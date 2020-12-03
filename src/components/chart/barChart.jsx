import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Customers registered in 2020",
        data: [30, 24, 34, 22, 44],
        
      },
      {
        label: "Jobs registered in 2020",
        data: [40, 34, 20, 54, 66],
        borderColor: [
          "rgba(250,205,16, 0.6)",
          "rgba(250,205,16, 0.6)",
          "rgba(250,205,16, 0.6)",
          "rgba(250,205,16, 0.6)",
          "rgba(250,205,16, 0.6)",
        ],
        backgroundColor: [
          "rgba(250,205,16, 0.6)",
          "rgba(250,205,16, 0.6)",
          "rgba(250,205,16, 0.6)",
          "rgba(250,205,16, 0.6)",
          "rgba(250,205,16, 0.6)",
        ],
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 80,
          },
        },
      ],
    },
  };

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
};

export default BarChart;
