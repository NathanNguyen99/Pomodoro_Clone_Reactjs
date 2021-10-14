import Dashboard from "./Components/Dashboard/Dashboard";
import Topbar from "./Components/Topbar/Topbar";
import { useState} from "react";
import './app.scss'
import TimerSetting from "./Components/TimerSeting/TimerSetting";
import useTimer from "./Components/hooks/useTimer";
import PlaySound from './Components/PlaySound/PlaySound';
import outDoor from './assets/bbc_outdoor.mp3'

function App() {
  const [activeButton, setActiveButton] = useState("Pomodoro");
  const [activeSetting, setActiveSetting] = useState(false);
  const [longBreakInterval, setLongBreakInterval] = useState(2);
  const [countLongBreak, setCountLongBreak] = useState(0);
  const obj = {
    Pomoro: 2,
    Short: 10*60,
    Long: 10*60,
  };

  const [data, setData] = useState(obj)

  const [autoStart, setAutoStart] = useState(false);
  const [autoStartPromo, setAutoStartPromo] = useState(false);

  const [todos, setTodos] = useState([])
  const [isChoose, setIsChoose] = useState(0);

  const { isActive,
    counter,
    setCounter,
    seconds,
    minutes,
    pause,
    start,
    reset, } = useTimer(data.Pomoro, handleTimerFinish);

  // Pomo -> Short, after 4 loop Pomo -> Long
  function handleTimerFinish() {
    if (activeButton === "Pomodoro") { 
      //<PlaySound url={outDoor}/>
      if (countLongBreak == longBreakInterval) {
        setActiveButton("Long Break");
        setCounter(data.Long)
        if (autoStart)
          start();
        return <PlaySound url={outDoor}/>
      }
      else {
        setActiveButton("Short Break");
        setCounter(data.Short)
        console.log('longBreakInterval: ' + longBreakInterval)
        if (autoStart)
          start();
        return <PlaySound url={outDoor}/>
      }
    }

    if (activeButton === "Short Break") {
      updateSessionNum();
      setCountLongBreak(countLongBreak + 1)
      setActiveButton("Pomodoro");
      setCounter(data.Pomoro)
      if (autoStartPromo)
        start();
    }

    if (activeButton === "Long Break") {
      updateSessionNum();
      setCountLongBreak(0)
      setActiveButton("Pomodoro");
      setCounter(data.Pomoro);
      if (autoStartPromo)
        start();
    }
  }

  const updateSessionNum = () => {
    let updatedTodos = todos.map(todo => {
      if (isChoose === todo.id) {
          todo.sessionNum++;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  
  return (
    <>
      <div className=
        {"App " + ((activeButton === "Pomodoro") ? "" : ((activeButton === "Short Break") ? "activeShort" : "activeLong"))}
      >
        <Topbar activeSetting={activeSetting} setActiveSetting={setActiveSetting} />
        <Dashboard todos={todos} setTodos={setTodos} isChoose={isChoose} setIsChoose={setIsChoose} activeButton={activeButton} setActiveButton={setActiveButton} data={data}
          isActive={isActive} counter={counter} setCounter={setCounter} seconds={seconds} minutes={minutes} pause={pause} start={start} reset={reset}
        />
      </div>
      <div className={activeSetting === true ? "timer-setting-main-active" : "timer-setting-main"}>
        <TimerSetting activeSetting={activeSetting} setActiveSetting={setActiveSetting}
          data={data} setData={setData} minutes={minutes}
          autoStart={autoStart} setAutoStart={setAutoStart} autoStartPromo={autoStartPromo} setAutoStartPromo={setAutoStartPromo}
          longBreakInterval={longBreakInterval} setLongBreakInterval={setLongBreakInterval} />
      </div>
    </>
  );
}

export default App;
