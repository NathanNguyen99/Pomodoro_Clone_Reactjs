import './dashboard.scss'
import TimeBoard from './TimeBoard/TimeBoard'
import { useState } from 'react'
import TaskBoard from './TasksBoard/TaskBoard'

const Dashboard = ({setCounter, startClicked, setStartClicked, isActive, counter, seconds, minutes, pause, start, reset, 
    data, activeButton, setActiveButton}) => {
    
    const [content, setContent] = useState('')
    const [todos, setTodos] = useState([])
    return (
        <div className="dashboard">
            <div className="dashboard-wrapper">
                <TimeBoard startClicked={startClicked} setStartClicked={setStartClicked}
                activeButton={activeButton} setActiveButton={setActiveButton} data={data} content={content} todos={todos}
                isActive={isActive} counter={counter} seconds={seconds} setCounter={setCounter} minutes={minutes} pause={pause} start={start} reset={reset}
                />
                
                <TaskBoard todos={todos} setTodos={setTodos} content={content} setContent={setContent}/>
            </div>
        </div>
    )
}

export default Dashboard
