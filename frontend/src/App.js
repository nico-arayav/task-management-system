// filepath: src/App.js
import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskChart from "./components/TaskChart";
import axios from "axios";
import { Container, Grid, Paper, Box, Typography } from "@mui/material";

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
		try {
			if (editingTask) {
				await axios.put(
					`http://127.0.0.1:8000/api/tasks/${editingTask.id}`,
					task
				);
			} else {
				await axios.post("http://127.0.0.1:8000/api/tasks", task);
			}
			setEditingTask(null);
			await fetchTasks();
		} catch (error) {
			console.error("Error updating or adding task:", error);
		}
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
		<Box
			sx={{
				minHeight: "100vh",
				backgroundColor: "#f5f5f5", // Light gray background
				padding: "16px",
			}}
		>
			<Container>
				<Typography
					variant="h3"
					align="center"
					gutterBottom
					sx={{ color: "#333" }}
				>
					Task Management System
				</Typography>
				<TaskForm
					onSubmit={handleAddOrUpdateTask}
					initialData={editingTask}
				/>
				<Grid container spacing={2} style={{ marginTop: "16px" }}>
					<Grid item size={{ xs: 12, sm: 8 }}>
						<Paper
							elevation={3}
							style={{
								padding: "16px",
								backgroundColor: "#ffffff", // White card background
								marginBottom: "16px", // Add spacing below the Task List
							}}
						>
							<TaskList
								tasks={tasks}
								onEdit={(task) => setEditingTask(task)}
								onDelete={handleDeleteTask}
							/>
						</Paper>
					</Grid>
					<Grid item size={{ xs: 12, sm: 4 }}>
						<Paper
							elevation={3}
							style={{
								padding: "16px",
								backgroundColor: "#ffffff", // White card background
							}}
						>
							<TaskChart tasks={tasks} />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default App;
