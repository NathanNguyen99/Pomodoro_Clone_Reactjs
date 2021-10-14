import './taskboard.scss'
import { IoMdArrowDropdown } from "react-icons/io";
import { useState, useRef } from 'react';
import TaskSetting from './TaskSetting';
import TaskList from './TaskComponent/TaskList';
import useOnClickOutside from '../../hooks/useOnClickOutside';
const TaskBoard = ({isChoose, setIsChoose, todos,  setTodos, content, setContent}) => {
    const [settingOpen, setSettingOpen] = useState(false)

    const ref = useRef()
    useOnClickOutside(ref, () => setSettingOpen(false));

    return (
        <div className="TaskBoard">
            <div className="TaskSetting-wrapper">
                <span className="TaskName">
                    Tasks
                </span>
                <div className="TaskSetting" ref={ref}>
                    <button className="SettingButton" onClick={() => (setSettingOpen(!settingOpen))}>
                        <IoMdArrowDropdown size="20"/>
                    </button>
                    <TaskSetting todos={todos} setTodos={setTodos} settingOpen={settingOpen} setSettingOpen={setSettingOpen}/>
                </div>
            </div>
            <div className="justALine" style={{marginTop: "18px"}}></div>
            
            <TaskList isChoose={isChoose} setIsChoose={setIsChoose} todos={todos} setTodos={setTodos} content={content} setContent={setContent}/>
        </div>
    )
}

export default TaskBoard
