import { useState } from 'react'

import { AiFillCheckCircle, AiOutlineBars } from "react-icons/ai";

import TaskForm from './TaskForm';

const Task = ({ todos, completeTodo, removeTodo, updateTodo, isChoose, setIsChoose, content, setContent, setTaskOpen, taskOpen }) => {

    // Check if edit?
    const [edit, setEdit] = useState({
        id: null,
        value: '',
        notevalue: ''
    });


    // submit to update????
    const submitUpdate = value => {
        updateTodo(edit.id, value);
        setEdit({
            id: null,
            value: '',
            notevalue: ''
        });
    };

    if (edit.id) {
        return <TaskForm edit={edit} onSubmit={submitUpdate} setTaskOpen={setTaskOpen} taskOpen={taskOpen} removeTodo={removeTodo} setContent={setContent}/>;
    }

    //0 === 0; index = 1

    return todos.map((todo) => (
        <div className="output-container-main">
            <div key={todo.id} className={"output-container-sub " + ((isChoose === todo.id) && "active")}>
                <div className="output-wrapper" onClick={() => {setIsChoose(todo.id); setContent(todo.text)}}>
                    <div className="left-part">
                        <div className="check-icon" key={todo.id} onClick={() => completeTodo(todo.id)}>
                            <AiFillCheckCircle className={todo.isComplete ? "check-button" : "uncheck-button"} size="27px" />
                        </div>
                        <span className={todo.isComplete ? "uncheck-content" : "content"}>
                            {todo.text}
                        </span>
                    </div>
                    <div className="right-part">
                        <span></span>
                        <div className="edit-button-wrapper" onClick={() => setEdit({ id: todo.id, value: todo.text, notevalue: todo.note })}>
                            <AiOutlineBars size="20px" className="edit-button"/>
                        </div>
                    </div>
                </div>
                {todo.note !== '' ? 
                <div className="note-wrapper" onClick={() => {setIsChoose(todo.id); setContent(todo.text)}}>
                    <p className="note-content">{todo.note}</p>
                </div>
                : ''}
            </div>
        </div>
    ));
}

export default Task
