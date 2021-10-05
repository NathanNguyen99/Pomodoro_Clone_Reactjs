import Dashboard from "./Components/Dashboard/Dashboard";
import Topbar from "./Components/Topbar/Topbar";
import { useState, useEffect, useRef } from "react";
import './app.scss'
import TimerSetting from "./Components/TimerSeting/TimerSetting";
import useTimer from "./Components/hooks/useTimer";

import digitalAlarm from './assets/mixkit-alarm-digital-clock-beep-989.wav'

function App() {
  const [startClicked, setStartClicked] = useState(false);
  const [activeButton, setActiveButton] = useState("Pomodoro");

  const [activeSetting, setActiveSetting] = useState(false);
  const [longBreakInterval, setLongBreakInterval] = useState(2);
  const [countLongBreak, setCountLongBreak] = useState(0);
  const obj = {
    Pomoro: 25*60,
    Short: 5*60,
    Long: 4*60,  
  };

  const [data, setData] = useState(obj)
  
  const [autoStart, setAutoStart] = useState(false);
  const [autoStartPromo, setAutoStartPromo] = useState(false);

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
      if(countLongBreak === longBreakInterval){
        setActiveButton("Long Break");
        setCounter(data.Long)
        if(autoStart)
          start();
      }
      else {
        setActiveButton("Short Break");
        setCounter(data.Short)
        console.log('longBreakInterval: ' + longBreakInterval)
        if(autoStart)
          start();
        
      }
    }

    if (activeButton === "Short Break") {
      setCountLongBreak(countLongBreak + 1)
      console.log('countLongBreak: '+countLongBreak)
      if(countLongBreak === longBreakInterval) {
        setActiveButton("Long Break");
        setCounter(data.Long)
        if(autoStart)
          start();
      }

      else {
        setActiveButton("Pomodoro");
        setCounter(data.Pomoro)
        console.log(autoStart)
        if(autoStartPromo)
          start();
      }
    }
    if (activeButton === "Long Break") {
      setCountLongBreak(0)
      setActiveButton("Pomodoro");
      setCounter(data.Pomoro);
      if(autoStartPromo)
        start();
    }
  }
  // App
  // activeButton === "Pomodoro"
  return (
    <>
      <div className=
        {"App " + ((activeButton === "Pomodoro") ? "" : ((activeButton === "Short Break") ? "activeShort" : "activeLong"))}
      >
        <Topbar activeSetting={activeSetting} setActiveSetting={setActiveSetting} />
        <Dashboard activeButton={activeButton} setActiveButton={setActiveButton} data={data}
          startClicked={startClicked} setStartClicked={setStartClicked} isActive={isActive} counter={counter} setCounter={setCounter} seconds={seconds} minutes={minutes} pause={pause} start={start} reset={reset}
        />
      </div>
      <div className={activeSetting === true ? "timer-setting-main-active" : "timer-setting-main"}>
        <TimerSetting activeSetting={activeSetting} setActiveSetting={setActiveSetting}
          data={data} setData={setData} minutes={minutes}
          autoStart={autoStart} setAutoStart={setAutoStart} autoStartPromo={autoStartPromo} setAutoStartPromo={setAutoStartPromo}
          longBreakInterval={longBreakInterval} setLongBreakInterval={setLongBreakInterval}/>
      </div>
    </>
  );
}

export default App;
