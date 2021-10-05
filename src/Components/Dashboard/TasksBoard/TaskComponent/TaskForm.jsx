import { useState, useRef } from 'react';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import useOnClickOutside from "../../../hooks/useOnClickOutside";


function TaskForm({ edit, onSubmit, setTaskOpen, taskOpen, removeTodo, setContent, content }) {
    const [input, setInput] = useState(edit ? edit.value : '');
    const [inputNote, setInputNote] = useState(edit ? edit.notevalue : '');

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
        // if(e.target.value !== '')
        //     setTaskOpen(!taskOpen);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setTaskOpen(!taskOpen)
        onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input,
            note: inputNote
        });

        if (content === '')
            setContent(input)
        setInput('');
    };

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
                                <span>This is something I don't know</span>
                                <input

                                    type='number'
                                    min='0'
                                    step='1'
                                    // value={input}
                                    onChange={handleChange}
                                    name='text'
                                    className='time-input'
                                // ref={inputRef}
                                />
                                <button className="increase-button">
                                    <FaArrowUp />
                                </button>
                                <button className="decrease-button">
                                    <FaArrowDown />
                                </button>
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
                            <button className="CancelButton" onClick={() => (setTaskOpen(!taskOpen))}>
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
                                <span>This is something I don't know</span>
                                <input

                                    type='number'
                                    min='0'
                                    step='1'
                                    // value={input}
                                    onChange={handleChange}
                                    name='text'
                                    className='time-input'
                                // ref={inputRef}
                                />
                                <button className="increase-button">
                                    <FaArrowUp />
                                </button>
                                <button className="decrease-button">
                                    <FaArrowDown />
                                </button>
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
                            <button className="CancelButton" onClick={() => (setTaskOpen(!taskOpen))}>
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
