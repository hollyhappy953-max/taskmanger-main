// frontend/src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { getTasks, createTask, deleteTask } from "../services/api";  // Changed this line

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks when component loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await getTasks();  // Changed from API.get to getTasks()
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  // Function to add a new task
  const addTask = async (taskData) => {
    try {
      const response = await createTask(taskData);  // Changed from API.post to createTask()
      setTasks([...tasks, response.data]);
      return true;
    } catch (error) {
      console.error('Error creating task:', error);
      return false;
    }
  };

  // Function to delete a task
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);  // Changed from API.delete to deleteTask()
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div>
      <h2>Task Manager Dashboard</h2>
      <TaskForm onTaskAdded={addTask} />
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
    </div>
  );
}

export default Dashboard;