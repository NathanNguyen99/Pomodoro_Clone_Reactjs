import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Task from "./Task";
import TaskForm from "./TaskForm";

const TaskList = ({todos, isChoose, setIsChoose, setTodos, content, setContent}) => {

    const [taskOpen, setTaskOpen] = useState(false);

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        const newTodos = [todo, ...todos];

        setTodos(newTodos);
        console.log(...todos);
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        // If the id is correct then make the item in todos to be newValue
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    };


    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !== id);

        setTodos(removedArr);
    };

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <> 
            <Task 
                todos={todos}  
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
                isChoose={isChoose} 
                setIsChoose={setIsChoose}
                content={content}
                setContent={setContent}
                taskOpen={taskOpen} 
                setTaskOpen={setTaskOpen}
                
            />
            {!taskOpen ? 
            <div className="AddTask-wrapper" onClick={() => (setTaskOpen(!taskOpen))}>
                <div className="AddIcon">
                    <AiOutlinePlusCircle size="24" color="white"/>
                </div>
                <div className="AddTask-name" 
                >
                    Add Task            
                </div>
            </div>
                : <TaskForm taskOpen={taskOpen} content={content} setContent={setContent} setTaskOpen={setTaskOpen} onSubmit={addTodo} />
            }
        </>
    );
}

export default TaskList
