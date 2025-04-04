import React, { memo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskChart = ({ tasks }) => {
	const statusCounts = tasks.reduce(
		(acc, task) => {
			acc[task.status] = (acc[task.status] || 0) + 1;
			return acc;
		},
		{ "to-do": 0, "in-progress": 0, completed: 0 }
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

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top",
			},
		},
	};

	return (
		<div style={{ width: "100%", height: "300px" }}>
			<Pie data={data} options={options} />
		</div>
	);
};

export default memo(TaskChart);
