// filepath: src/components/TaskList.js
import React from "react";
import {
	Box,
	Typography,
	Button,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";

const TaskList = ({ tasks, onEdit, onDelete }) => {
	console.log("TaskList received tasks:", tasks); // Debug log

	return (
		<Box>
			<Typography variant="h4" gutterBottom>
				Task List
			</Typography>
			<List>
				{tasks.map((task) => (
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
		</Box>
	);
};

export default TaskList;
