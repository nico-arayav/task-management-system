// filepath: src/components/TaskChart.js
import React from "react";
import { Pie } from "react-chartjs-2";

const TaskChart = ({ tasks }) => {
  const statusCounts = tasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    { "to-do": 0, "in-progress": 0, "completed": 0 }
  );

  const data = {
    labels: ["To-Do", "In-Progress", "Completed"],
    datasets: [
      {
        data: [
          statusCounts["to-do"],
          statusCounts["in-progress"],
          statusCounts["completed"],
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0"],
      },
    ],
  };

  return <Pie data={data} />;
};

export default TaskChart;