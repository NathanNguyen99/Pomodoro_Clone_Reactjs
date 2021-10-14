import './timeboard.scss'
import { BiSkipNext } from 'react-icons/bi'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const TimeBoard = ({ isActive, setCounter, counter, seconds, minutes, pause, start, reset
    , todos, content, data, activeButton, setActiveButton }) => {

    const handleClick = (name, time) => {
        setActiveButton(name);
        setCounter(time);
    }

    const handleNext = () => {
        confirmAlert({
            title: 'Are you sure you want to finish the round early?',
            message: 'The remaining time will not be counted in the report.',
            buttons: [
                {
                    label: 'No',
                    onClick: () => {
                        start()
                    }
                },
                {
                    label: 'Yes',
                    onClick: () => {
                        setCounter(0);
                        start();
                    }
                },
            ]
        });
    };

    const handleContent = (content) => {
        const defaultContent = 'Time to focus';

        if (content === '')
            return defaultContent
        else {
            if (content === "deleted") {
                if (todos.length === 0)
                    return defaultContent
                else
                    return todos[0].text
            }
            return content
        }
    }

    return (
        <div className="timeboard">
            <div className="timeboard-wrapper">
                <div className="timeboard-button-wrapper">
                    <button
                        name="Pomodoro"
                        className={activeButton === "Pomodoro" ? "active-timeboard-status-button" : "timeboard-status-button"}
                        onClick={() => handleClick("Pomodoro", data.Pomoro)}
                    >Pomodoro</button>
                    <button
                        name="Short Break"
                        className={activeButton === "Short Break" ? "active-timeboard-status-button" : "timeboard-status-button"}
                        onClick={() => handleClick("Short Break", data.Short)}
                    >Short Break</button>
                    <button
                        name="Long Break"
                        className={activeButton === "Long Break" ? "active-timeboard-status-button" : "timeboard-status-button"}
                        onClick={() => handleClick("Long Break", data.Long)}
                    >Long Break</button>
                </div>
                <div className="timer">
                    {`${minutes} : ${seconds}`}
                </div>
                <div className="start-button-wrapper">
                    <button
                        className={"start-button " + (isActive && 'active')}
                        onClick={() => {
                            isActive ? pause() : start();
                        }}>
                        {isActive ? "PAUSE" : "START"}
                    </button>
                    <div className="next-button-wrapper">
                        <button
                            className={"next-button " + (isActive && "active")}
                            onClick={() => {pause(); handleNext()}}
                        ><BiSkipNext color='white' size='50' /></button>
                    </div>
                </div>

            </div>
            <div className="sessionNumber">
                #1
            </div>
            <div className="taskName">
                {handleContent(content)}
            </div>
        </div>
    )
}

export default TimeBoard
