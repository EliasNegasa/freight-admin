import React from "react";
import { Line } from "react-chartjs-2";

function LineChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Customers registered in 2020",
        data: [30, 24, 34, 22, 44],
        borderColor: ["rgba(250,205,16, 0.6)"],
        backgroundColor: ["rgba(250,205,16,0.2)"],
        pointBackgroundColor: "rgba(250,205,16,1)",
        pointBorderColor: "rgba(250,205,16,1",
      },
      {
        label: "Jobs registered in 2020",
        data: [40, 34, 20, 54, 66],
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
      <Line data={data} options={options} />
    </>
  );
}

export default LineChart;
