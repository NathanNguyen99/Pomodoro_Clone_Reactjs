import './dashboard.scss'
import TimeBoard from './TimeBoard/TimeBoard'
import { useState } from 'react'
import TaskBoard from './TasksBoard/TaskBoard'

const Dashboard = ({todos, setTodos, isChoose, setIsChoose, setCounter, isActive, counter, seconds, minutes, pause, start, reset, 
    data, activeButton, setActiveButton}) => {
    
    const [content, setContent] = useState('')
    
    return (
        <div className="dashboard">
            <div className="dashboard-wrapper">
                <TimeBoard 
                activeButton={activeButton} setActiveButton={setActiveButton} data={data} content={content} todos={todos}
                isActive={isActive} counter={counter} seconds={seconds} setCounter={setCounter} minutes={minutes} pause={pause} start={start} reset={reset}
                
                />
                
                <TaskBoard isChoose={isChoose} setIsChoose={setIsChoose} todos={todos} setTodos={setTodos} content={content} setContent={setContent}/>
            </div>
        </div>
    )
}

export default Dashboard
