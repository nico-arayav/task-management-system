// filepath: src/components/TaskList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button, List, ListItem, ListItemText } from "@mui/material";

const TaskList = ({ onEdit, onDelete }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

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