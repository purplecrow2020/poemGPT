import ReactApexChart from "react-apexcharts";
import React from "react";

const ApexChart = ({labels, data, colors}) => {
  console.log(labels, data, colors);
  const pieChartOptions = {
    chart: {
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 3000,
        animateGradually: {
          enabled: true,
          delay: 1000,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 1000,
        }
      }
    },
    labels,
    colors,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={pieChartOptions}
        series={data}
        type="pie"
        width="380"
      />
    </div>
  );
};

export default ApexChart;
