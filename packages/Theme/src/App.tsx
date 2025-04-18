import React, { useState, useEffect } from 'react'

function App() {
    const [tasks, setTasks] = useState<
        { id: number; text: string; completed: boolean }[]
    >([])
    const [inputValue, setInputValue] = useState('')
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // 从 localStorage 中读取主题模式，默认为白天模式
        const savedMode = localStorage.getItem('themeMode')
        return savedMode === 'dark'
    })

    // 当 isDarkMode 变化时，更新 localStorage
    useEffect(() => {
        localStorage.setItem('themeMode', isDarkMode ? 'dark' : 'light')
    }, [isDarkMode])

    const addTask = () => {
        if (inputValue.trim()) {
            setTasks([
                ...tasks,
                { id: Date.now(), text: inputValue, completed: false },
            ])
            setInputValue('')
        }
    }

    const toggleTaskCompletion = (id: number) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task,
            ),
        )
    }

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode)
    }

    const themeStyles = {
        backgroundColor: isDarkMode ? '#333' : '#fff',
        color: isDarkMode ? '#fff' : '#333',
    }

    return (
        <div
            style={{
                ...themeStyles,
                fontFamily: 'Arial, sans-serif',
                maxWidth: '400px',
                margin: '0 auto',
                padding: '20px',
                minHeight: '100vh',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >
                <h1 style={{ textAlign: 'center', color: themeStyles.color }}>
                    TODO List
                </h1>
                <button
                    onClick={toggleTheme}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: isDarkMode ? '#007bff' : '#333',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && addTask()}
                    placeholder="Add a new task"
                    style={{
                        flex: 1,
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor: isDarkMode ? '#444' : '#fff',
                        color: isDarkMode ? '#fff' : '#333',
                    }}
                />
                <button
                    onClick={addTask}
                    style={{
                        marginLeft: '10px',
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Add
                </button>
            </div>
            <ul style={{ listStyle: 'none', padding: '0' }}>
                {tasks.map(task => (
                    <li
                        key={task.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px',
                            marginBottom: '10px',
                            backgroundColor: isDarkMode ? '#444' : '#f9f9f9',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                        }}
                    >
                        <span
                            style={{
                                textDecoration: task.completed
                                    ? 'line-through'
                                    : 'none',
                                color: task.completed
                                    ? '#888'
                                    : themeStyles.color,
                                cursor: 'pointer',
                            }}
                            onClick={() => toggleTaskCompletion(task.id)}
                        >
                            {task.text}
                        </span>
                        <button
                            onClick={() => deleteTask(task.id)}
                            style={{
                                padding: '5px 10px',
                                backgroundColor: '#dc3545',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
