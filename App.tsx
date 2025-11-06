import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, Checkbox } from '@mui/material';
import axios from 'axios';

interface Todo {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
}

const API_URL = 'http://localhost:8000/todos/';

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const fetchTodos = async () => {
        const res = await axios.get(API_URL);
        setTodos(res.data);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const addTodo = async () => {
        if (!title) return;
        await axios.post(API_URL, { title, description });
        setTitle('');
        setDescription('');
        fetchTodos();
    };

    const toggleTodo = async (todo: Todo) => {
        await axios.put(`${API_URL}${todo.id}`, { ...todo, completed: !todo.completed });
        fetchTodos();
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>TODO App</Typography>
            <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} fullWidth margin="normal" />
            <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} fullWidth margin="normal" />
            <Button variant="contained" color="primary" onClick={addTodo} sx={{ mb: 2 }}>Add</Button>
            <List>
                {todos.map(todo => (
                    <ListItem key={todo.id} secondaryAction={
                        <Checkbox checked={todo.completed} onChange={() => toggleTodo(todo)} />
                    }>
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.title} - {todo.description}
                        </span>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default App;
