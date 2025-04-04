// filepath: src/components/TaskForm.js
import React, { useState, useEffect } from "react";
import {
	Box,
	TextField,
	Button,
	Typography,
	MenuItem,
	Select,
	FormControl,
} from "@mui/material";

const TaskForm = ({ onSubmit, initialData }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState("");

	useEffect(() => {
		if (initialData) {
			setTitle(initialData.title || "");
			setDescription(initialData.description || "");
			setStatus(initialData.status || "");
		} else {
			setTitle("");
			setDescription("");
			setStatus("");
		}
	}, [initialData]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ title, description, status });
	};

	return (
		<Box component="form" onSubmit={handleSubmit}>
			<Typography variant="h4" gutterBottom>
				{initialData ? "Edit Task" : "Add Task"}
			</Typography>
			<TextField
				label="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				fullWidth
				margin="normal"
				required
			/>
			<TextField
				label="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				fullWidth
				margin="normal"
				required
			/>
			<FormControl fullWidth margin="normal">
				<Select
					value={status}
					onChange={(e) => setStatus(e.target.value)}
					displayEmpty
					required
				>
					<MenuItem value="" disabled>
						Select Status
					</MenuItem>
					<MenuItem value="to-do">To-Do</MenuItem>
					<MenuItem value="in-progress">In-Progress</MenuItem>
					<MenuItem value="completed">Completed</MenuItem>
				</Select>
			</FormControl>
			<Button type="submit" variant="contained" color="primary">
				{initialData ? "Update Task" : "Add Task"}
			</Button>
		</Box>
	);
};

export default TaskForm;
