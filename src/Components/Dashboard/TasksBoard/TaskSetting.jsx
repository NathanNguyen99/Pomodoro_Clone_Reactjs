import './tasksettingmenu.scss'

import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineCheck, AiOutlineSave } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";


const TaskSetting = ({ todos, setTodos, settingOpen, setSettingOpen}) => {
    

    const style = {opacity: "0.8",
    width: "14px",
    marginright: "8px",}

    const handleClearAllTask = () => {
        setSettingOpen(!settingOpen);
        setTodos([])
    }

    const handleFinishedTask = () => {

        const removedArr = [...todos].filter(todo => todo.isComplete !== true);
        setSettingOpen(!settingOpen);
        setTodos(removedArr);
    }

    return (
        <div className={'TaskSettingMenu ' + (settingOpen && 'active')}>
            <div className="Options" onClick={handleClearAllTask}>
                <RiDeleteBin5Line style={style}/>Clear all tasks
            </div>
            <div className="Options" onClick={handleFinishedTask}>
                <RiDeleteBin5Line style={style} />Clear finished tasks
            </div>
            <div className="Options">
                <AiOutlineCheck style={style}/>Clear acts
            </div>
            <div className="Options">
                <AiOutlineSave style={style}/>Clear acts
            </div>
            <div className="Options">
                <GrAdd style={style}/>Clear acts

            </div>
            
        </div>
    )
}

export default TaskSetting
