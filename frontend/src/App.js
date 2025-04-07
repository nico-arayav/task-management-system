import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskChart from "./components/TaskChart";
import axios from "axios";
import { Container, Grid, Paper, Box, Typography } from "@mui/material";

const API_BASE_URL =
	process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

if (!process.env.REACT_APP_API_BASE_URL) {
	console.warn(
		"REACT_APP_API_BASE_URL is not set. Using default localhost URL."
	);
}

const App = () => {
	const [tasks, setTasks] = useState([]);
	const [editingTask, setEditingTask] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchTasks = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${API_BASE_URL}/tasks`);
			setTasks(response.data);
		} catch (error) {
			console.error("Error fetching tasks:", error);
			alert("Failed to fetch tasks. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	const handleAddOrUpdateTask = async (task) => {
		try {
			if (editingTask) {
				await axios.put(
					`${API_BASE_URL}/tasks/${editingTask.id}`,
					task
				);
			} else {
				await axios.post(`${API_BASE_URL}/tasks`, task);
			}
			setEditingTask(null);
			await fetchTasks();
		} catch (error) {
			console.error("Error updating or adding task:", error);
			alert("Failed to update or add the task. Please try again later.");
		}
	};

	const handleDeleteTask = async (taskId) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this task?"
		);
		if (!confirmDelete) return;

		try {
			await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
			fetchTasks();
		} catch (error) {
			console.error("Error deleting task:", error);
			alert("Failed to delete the task. Please try again later.");
		}
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				backgroundColor: "#f5f5f5",
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
				{loading ? (
					<Typography align="center">Loading tasks...</Typography>
				) : (
					<>
						<TaskForm
							onSubmit={handleAddOrUpdateTask}
							initialData={editingTask}
						/>
						<Grid
							container
							spacing={2}
							style={{ marginTop: "16px" }}
						>
							<Grid item size={{ xs: 12, sm: 8 }}>
								<Paper
									elevation={3}
									style={{
										padding: "16px",
										backgroundColor: "#ffffff",
										marginBottom: "16px",
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
										backgroundColor: "#ffffff",
									}}
								>
									<TaskChart tasks={tasks} />
								</Paper>
							</Grid>
						</Grid>
					</>
				)}
			</Container>
		</Box>
	);
};

export default App;
