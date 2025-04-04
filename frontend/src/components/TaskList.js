// filepath: src/components/TaskList.js
import React, { useState } from "react";
import {
	Box,
	Typography,
	Button,
	List,
	ListItem,
	ListItemText,
	Pagination,
} from "@mui/material";

const TaskList = ({ tasks, onEdit, onDelete }) => {
	const [page, setPage] = useState(1);
	const tasksPerPage = 4;

	// Calculate the tasks to display on the current page
	const startIndex = (page - 1) * tasksPerPage;
	const endIndex = startIndex + tasksPerPage;
	const paginatedTasks = tasks.slice(startIndex, endIndex);

	const handlePageChange = (event, value) => {
		setPage(value);
	};

	return (
		<Box>
			<Typography variant="h4" gutterBottom>
				Task List
			</Typography>
			<List>
				{paginatedTasks.map((task) => (
					<ListItem key={task.id} divider>
						<ListItemText
							primary={task.title}
							secondary={`${task.description} - ${task.status}`}
							style={{ marginRight: "16px" }}
						/>
						<Button
							variant="contained"
							color="primary"
							onClick={() => onEdit(task)}
							style={{ marginRight: "10px" }}
						>
							Edit
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => onDelete(task.id)}
						>
							Delete
						</Button>
					</ListItem>
				))}
			</List>
			<Box display="flex" justifyContent="center" marginTop="16px">
				<Pagination
					count={Math.ceil(tasks.length / tasksPerPage)}
					page={page}
					onChange={handlePageChange}
					color="primary"
				/>
			</Box>
		</Box>
	);
};

export default TaskList;
