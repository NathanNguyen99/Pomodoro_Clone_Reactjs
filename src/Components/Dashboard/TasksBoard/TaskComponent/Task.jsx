import { useState } from 'react'

import { AiFillCheckCircle, AiOutlineBars } from "react-icons/ai";

import TaskForm from './TaskForm';

const Task = ({ todos, completeTodo, removeTodo, updateTodo, isChoose, setIsChoose, content, setContent, setTaskOpen, taskOpen }) => {

    // Check if edit?
    const [edit, setEdit] = useState({
        id: null,
        value: '',
        notevalue: '',
        sessionvalue: 1,
        isComplete: Boolean
    });

    // submit to update????
    const submitUpdate = value => {
        updateTodo(edit.id, value);
        setEdit({
            id: null,
            value: '',
            notevalue: '',
            sessionvalue: 1,
            isComplete: Boolean
        });
    };
 
    if (edit.id) {
        return <TaskForm edit={edit} onSubmit={submitUpdate} setTaskOpen={setTaskOpen} taskOpen={taskOpen} removeTodo={removeTodo} setContent={setContent}/>;
    }

    return todos.map((todo) => (
        <div key={todo.id} className="output-container-main">
            <div  className={"output-container-sub " + ((isChoose === todo.id) && "active")}>
                <div className="output-wrapper" onClick={() => {setIsChoose(todo.id); setContent(todo.text)}}>
                    <div className="left-part">
                        <div className="check-icon" onClick={() => {completeTodo(todo.id)}}>
                            <AiFillCheckCircle className={todo.isComplete ? "check-button" : "uncheck-button"} size="27px" />
                        </div>
                        <span className={todo.isComplete ? "uncheck-content" : "content"}>
                            {todo.text}
                        </span>
                    </div>
                    <div className="right-part">
                        <span className="session-wrapper">
                            {todo.sessionNum}
                            <span className="total-session">
                                /{todo.session}
                            </span>
                        </span>
                        <div className="edit-button-wrapper" 
                        onClick={e => {e.preventDefault();
                            setEdit({ id: todo.id, value: todo.text, notevalue: todo.note, 
                            sessionvalue: todo.session, isComplete: todo.isComplete })}}>
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
