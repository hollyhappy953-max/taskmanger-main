// frontend/src/components/TaskList.js
import React from 'react';

function TaskList({ tasks, onDeleteTask }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div>
        <h3>Task List</h3>
        <p>Your tasks will appear here</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Task List ({tasks.length})</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ 
            marginBottom: '15px', 
            padding: '15px', 
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: task.completed ? '#f8f9fa' : 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '18px' }}>{task.title}</strong>
                {task.completed && <span style={{ marginLeft: '10px', color: 'green' }}>✓ Completed</span>}
              </div>
              <button 
                onClick={() => onDeleteTask(task.id)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
            {task.description && (
              <p style={{ marginTop: '10px', color: '#666' }}>{task.description}</p>
            )}
            <small style={{ color: '#999' }}>
              Created: {new Date(task.created_at).toLocaleDateString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;