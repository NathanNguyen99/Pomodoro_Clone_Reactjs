import { useState, useRef } from 'react';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import useOnClickOutside from "../../../hooks/useOnClickOutside";


function TaskForm({ edit, onSubmit, setTaskOpen, taskOpen, removeTodo, setContent, content }) {
    const [input, setInput] = useState(edit ? edit.value : '');
    const [inputNote, setInputNote] = useState(edit ? edit.notevalue : '');
    const [inputSession, setInputSession] = useState(edit ? edit.sessionvalue : 1);

    // Check note state
    const [addNote, setAddNote] = useState(false);

    const inputRef = useRef(null);
    const noteRef = useRef(null);

    const ref = useRef()
    useOnClickOutside(ref, () => setTaskOpen(false))

    // Point to todo input when click Add Task
    // useEffect(() => {
    //     inputRef.current.focus();
    //     noteRef.current.focus();
    // }, [inputRef, noteRef]);

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleChangeNote = e => {
        setInputNote(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        // Case when this Edit isChoose
        if(edit) {
            onSubmit({
                id: edit.id,
                text: input,
                note: inputNote,
                session: inputSession,
                isComplete: edit.isComplete,
            });

            setContent(input)
            setTaskOpen(false)
            setInput('');
        }
        else{
            onSubmit({
                id: Math.floor(Math.random() * 10000),
                text: input,
                note: inputNote,
                session: inputSession,
                sessionNum: 0
            });
            if (content === '')
                setContent(input)
            setTaskOpen(false)
            setInput('');
        }
    };

    const handleCancel = () => {
        setInput(edit ? edit.value : '');
        setInputNote(edit ? edit.notevalue : '');
        setInputSession(edit ? edit.sessionvalue : '');
        setTaskOpen(false);
    }

    return (
        <form onSubmit={handleSubmit} ref={ref} autoComplete="off" className='TodoForm'>
            {edit ? (
                <>
                    <div className="InputPart" >
                        <div className="first-input">
                            <input
                                placeholder='Update your item'
                                value={input}
                                onChange={handleChange}
                                name='text'
                                className='todo-input'
                                ref={inputRef}
                            />
                        </div>
                        <div className="second-input">
                            <div className="second-input-wrapper">
                                <span>Pomodoro Sessions</span>
                                <input

                                    type='number'
                                    min='1'
                                    step='1'
                                    value={inputSession}
                                    onChange={(e) => setInputSession(e.target.value)}
                                    name=''
                                    className='time-input'
                                // ref={inputRef}
                                />
                            </div>
                        </div>
                        <div className="last-input">
                            {(inputNote !== '') ?
                                <textarea
                                    className="note-input"
                                    placeholder='Some notes...'
                                    name=""
                                    value={inputNote}
                                    id=""
                                    onChange={handleChangeNote}
                                    ref={noteRef}
                                ></textarea>
                                :
                                (!addNote) ?
                                    <button className="AddNote" onClick={() => (setAddNote(!addNote))}>
                                        + Add Note
                                    </button>
                                    :
                                    <textarea
                                        className="note-input"
                                        placeholder='Some notes...'
                                        name=""
                                        value={inputNote}
                                        id=""
                                        onChange={handleChangeNote}
                                        ref={noteRef}
                                    > </textarea>
                            }
                        </div>
                    </div>
                    <div className="SubmitPart">
                        <button className="DeleteButton" onClick={() => { removeTodo(edit.id); setTaskOpen(!taskOpen); setContent('deleted') }}>
                            Delete
                        </button>
                        <div className="Button-wrapper">
                            <button className="CancelButton" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button disabled={!input} className="SubmitButton" onClick={handleSubmit} >
                                Save
                            </button>
                        </div>
                    </div>
                </>) : (
                <>
                    <div className="InputPart" >
                        <div className="first-input">
                            <input
                                placeholder='What are you working on?'
                                value={input}
                                onChange={handleChange}
                                name='text'
                                className='todo-input'
                                ref={inputRef}
                            />
                        </div>
                        <div className="second-input">
                        <div className="second-input-wrapper">
                                <span>Pomodoro Sessions</span>
                                <input
                                    type='number'
                                    min='1'
                                    step='1'
                                    value={inputSession}
                                    onChange={(e) => setInputSession(e.target.value)}
                                    name=''
                                    className='time-input'
                                // ref={inputRef}
                                />
                            </div>
                        </div>
                        <div className="last-input">
                            {(!addNote) ?
                                <button className="AddNote" onClick={() => (setAddNote(!addNote))}>
                                    + Add Note
                                </button>
                                :
                                <textarea
                                    className="note-input"
                                    placeholder='Some notes...'
                                    name=""
                                    value={inputNote}
                                    id=""
                                    onChange={handleChangeNote}
                                    ref={noteRef}></textarea>
                            }
                        </div>
                    </div>
                    <div className="SubmitPart">
                        <button style={{ visibility: 'hidden' }}>

                        </button>
                        <div className="Button-wrapper">
                            <button className="CancelButton" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button disabled={!input} className="SubmitButton" onClick={handleSubmit} >
                                Save
                            </button>
                        </div>
                    </div>
                </>)
            }
        </form>
    );
}


export default TaskForm
