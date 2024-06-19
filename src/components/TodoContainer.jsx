import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import ButtonContainer from './ButtonContainer';
import './TodoContainer.css';

function TodoContainer({ theme, toggleTheme }) {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);
    const [newTitle, setNewTitle] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/todos');
                setTodos(response.data);
                console.log(response);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, []);

    const createTodo = async () => {
        // 4.2 새로운 TodoItem 생성
        // - axios를 사용하여 서버의 /api/todos 엔드포인트에 POST 요청을 보냅니다.
        // - 요청 본문에는 새로운 TodoItem의 제목과 초기 완료 상태를 포함합니다.
        // - 새로운 TodoItem이 성공적으로 생성되면 서버에서 모든 TodoItem을 다시 가져와 상태를 업데이트합니다.
        // - 요청 중 오류가 발생하면 이를 콘솔에 기록합니다.
        try{
            axios.post('http://localhost:8080/api/todos', {title:'새 할일', completed: false});
            const response = await axios.get('http://localhost:8080/api/todos');
            setTodos(response.data);
        } catch(error){
            console.error('Error fetching todos:', error);
        }
    };
    
    

    return (
        <div className="todo-app-container">
            <ButtonContainer createTodo={createTodo} />
            <div className="todo-list">
                {todos.map(todo => (
                    <TodoItem 
                        key={todo.id}
                        todo={todo}
                        setTodos={setTodos}
                        editingTodo={editingTodo}
                        setEditingTodo={setEditingTodo}
                        newTitle={newTitle}
                        setNewTitle={setNewTitle}
                    />
                ))}
            </div>
        </div>
    );
}

export default TodoContainer;
