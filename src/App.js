import React, { useState } from 'react';
import './App.css';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editedTask, setEditedTask] = useState(null);
    const [editedText, setEditedText] = useState('');

    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: newTask }]);
            setNewTask('');
        }
    };

    const editTask = (id) => {
        const taskToEdit = tasks.find((task) => task.id === id);
        if (taskToEdit) {
            setEditedTask(id);
            setEditedText(taskToEdit.text);
        }
    };

    const saveTask = (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, text: editedText } : task
        );
        setTasks(updatedTasks);
        setEditedTask(null);
    };

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
    };

    return (
        <div className="task-list">
            <h1>Task List</h1>
            <div>
                <input
                    className='input-task'
                    type="text"
                    placeholder="Add a new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button className="btnadd" onClick={addTask}>Add</button>
            </div>

                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            {editedTask === task.id ? (
                                <div>
                                    <input
                                        className='input-edit'
                                        type="text"
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                    />
                                    <button className='btn-save' onClick={() => saveTask(task.id)}>Save</button>
                                </div>
                            ) : (
                                <div className='ul-list'> 
                                    {task.text}
                                    <button className="btn-edit" onClick={() => editTask(task.id)}>Edit</button>
                                    <button className="btn-delete" onClick={() => deleteTask(task.id)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
    );
}

export default TaskList;