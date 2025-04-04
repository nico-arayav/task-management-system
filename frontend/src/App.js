// filepath: src/App.js
import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskChart from "./components/TaskChart";
import axios from "axios";
import { Container, Grid, Paper } from "@mui/material";

const App = () => {
	const [tasks, setTasks] = useState([]);
	const [editingTask, setEditingTask] = useState(null);

	const fetchTasks = async () => {
		const response = await axios.get("http://127.0.0.1:8000/api/tasks");
		setTasks(response.data);
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	const handleAddOrUpdateTask = async (task) => {
		if (editingTask) {
			await axios.put(
				`http://127.0.0.1:8000/api/tasks/${editingTask.id}`,
				task
			);
		} else {
			await axios.post("http://127.0.0.1:8000/api/tasks", task);
		}
		setEditingTask(null);
		fetchTasks();
	};

	const handleDeleteTask = async (taskId) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this task?"
		);
		if (!confirmDelete) return;

		await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}`);
		fetchTasks();
	};

	return (
		<Container>
			<TaskForm
				onSubmit={handleAddOrUpdateTask}
				initialData={editingTask}
			/>
			<Grid container spacing={2} style={{ marginTop: "16px" }}>
				<Grid item size={{ xs: 12, sm: 8 }}>
					<Paper
						elevation={3}
						style={{ padding: "16px", height: "100%" }}
					>
						<TaskList
							onEdit={(task) => setEditingTask(task)}
							onDelete={handleDeleteTask}
						/>
					</Paper>
				</Grid>
				<Grid item size={{ xs: 12, sm: 4 }}>
					<Paper
						elevation={3}
						style={{ padding: "16px", height: "100%" }}
					>
						<TaskChart tasks={tasks} />
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};

export default App;
