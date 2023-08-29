import { Chart } from "react-google-charts";
// This is also stale , we can ignore the use
const PieChart = () => {
  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7]
  ];
  const options = {
    title: "conclusion of the Poem",
    animation: {
      startup: true, // Enable animation on startup
      duration: 1000, // Animation duration in milliseconds
      easing: "out" // Animation easing function
    }
  };
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
};
export default PieChart;
