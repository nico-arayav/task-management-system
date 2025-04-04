// filepath: src/App.js
import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskChart from "./components/TaskChart";
import axios from "axios";
import { Container } from "@mui/material";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/tasks");
    setTasks(response.data);
  };

  const handleAddOrUpdateTask = async (task) => {
    if (editingTask) {
      await axios.put(`http://127.0.0.1:8000/api/tasks/${editingTask.id}`, task);
    } else {
      await axios.post("http://127.0.0.1:8000/api/tasks", task);
    }
    setEditingTask(null);
    fetchTasks();
  };

  const handleDeleteTask = async (taskId) => {
    await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}`);
    fetchTasks();
  };

  return (
    <Container>
      <TaskForm
        onSubmit={handleAddOrUpdateTask}
        initialData={editingTask}
      />
      <TaskList
        onEdit={(task) => setEditingTask(task)}
        onDelete={handleDeleteTask}
      />
      <TaskChart tasks={tasks} />
    </Container>
  );
};

export default App;