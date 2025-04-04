// filepath: src/components/TaskForm.js
import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const TaskForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState(initialData?.status || "to-do");

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
      <TextField
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary">
        {initialData ? "Update Task" : "Add Task"}
      </Button>
    </Box>
  );
};

export default TaskForm;