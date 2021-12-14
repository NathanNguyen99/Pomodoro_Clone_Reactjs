import "./timersetting.scss";
import { GiCancel } from "react-icons/gi";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { useState } from "react";
import { useRef } from "react";
import React from "react";
import useSound from "use-sound";
    
const TimerSetting = ({
  activeSetting,
  setActiveSetting,
  data,
  setData,
  minutes,
  autoStart,
  setAutoStart,
  autoStartPromo,
  setAutoStartPromo,
  longBreakInterval,
  setLongBreakInterval,
}) => {
  const ref = useRef();
  useOnClickOutside(ref, () => setActiveSetting(false));

  // array
  const [input1, setInput1] = useState(data.Pomoro / 60);
  const [input2, setInput2] = useState(data.Short / 60);
  const [input3, setInput3] = useState(data.Long / 60);
  const [longBreakInput, setLongBreakInput] = useState(longBreakInterval);
  const [playActive] = useSound("../../sounds/pop-down.mp3", { volume: 0.25 });
  const [playOn] = useSound("../../sounds/pop-up-on.mp3", { volume: 0.25 });
  const [playOff] = useSound("../../sounds/pop-up-off.mp3", { volume: 0.25 });
  const handleSubmit = (e) => {
    e.preventDefault();

    setData({
      Pomoro: input1 * 60,
      Short: input2 * 60,
      Long: input3 * 60,
    });
    setLongBreakInterval(longBreakInput);

    setActiveSetting(!activeSetting);
  };

  const handleCancel = (e) => {
    e.preventDefault();

    setInput1(data.Pomoro / 60);
    setInput2(data.Short / 60);
    setInput3(data.Long / 60);
    setLongBreakInput(longBreakInterval);

    setActiveSetting(!activeSetting);
  };

  return (
    <div className="timer-setting" ref={ref}>
      <GiCancel className="cancel-button" onClick={handleCancel} />
      <div className="timer-setting-container">
        <div className="timer-setting-wrapper">
          <div className="timer-setting-name">TIMER SETTINGS</div>
          <div className="setting-config">
            <div className="time-config">
              <div className="time-config-name">
                <span>Time (minutes)</span>
              </div>
              <div className="time-config-time">
                <div className="config-cell">
                  <label className="config-cell-label">Pomodoro</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    name="Pomodoro"
                    onChange={(e) => setInput1(e.target.value)}
                    value={input1}
                    className="config-cell-input"
                  />
                </div>
                <div className="config-cell">
                  <label className="config-cell-label">Short Break</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    name="Short"
                    onChange={(e) => setInput2(e.target.value)}
                    value={input2}
                    className="config-cell-input"
                  />
                </div>
                <div className="config-cell">
                  <label className="config-cell-label">Long Break</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    name="Long"
                    onChange={(e) => setInput3(e.target.value)}
                    value={input3}
                    className="config-cell-input"
                  />
                </div>
              </div>
            </div>
            <div className="setting-config">
              <div className="setting-config-wrapper">
                <div className="setting-config-name">
                  <span>Auto start Breaks?</span>
                </div>
                <div
                  className={"on-off-button " + (autoStart && "active")}
                  onClick={() => setAutoStart(!autoStart)}
                  onMouseDown={playActive}
                  onMouseUp={() => {
                    autoStart ? playOff() : playOn();
                  }}
                >
                  <div className="attr"></div>
                </div>
              </div>
            </div>
            <div className="setting-config">
              <div className="setting-config-wrapper">
                <div className="setting-config-name">
                  <span>Auto start Pomodoros?</span>
                </div>
                <div
                  className={"on-off-button " + (autoStartPromo && "active")}
                  onClick={() => setAutoStartPromo(!autoStartPromo)}
                  onMouseDown={playActive}
                  onMouseUp={() => {
                    autoStart ? playOff() : playOn();
                  }}
                >
                  <div className="attr"></div>
                </div>
              </div>
            </div>
            <div className="setting-config">
              <div className="setting-config-wrapper">
                <div className="setting-config-name">
                  <span>Long Break interval</span>
                </div>
                <input
                  type="number"
                  className="long-break-interval-input"
                  onChange={(e) => setLongBreakInput(e.target.value)}
                  min="1"
                  step="1"
                  width="70"
                  value={longBreakInput}
                />
              </div>
            </div>
            <div className="setting-config">
              <div className="setting-config-wrapper">
                <div className="setting-config-name">
                  <span>Alarm Sound</span>
                </div>
                <div className="volume-modifier"></div>
                <div className="frequency-volume-wrapper"></div>
              </div>
            </div>
            <div className="setting-config">
              <div className="setting-config-wrapper">
                <div className="setting-config-name">
                  <span>Ticking Sound</span>
                </div>
                <div className="on-off-button"></div>
              </div>
            </div>
            <div className="setting-config">
              <div className="setting-config-wrapper">
                <div className="setting-config-name">
                  <span>Dark Mode when running</span>
                </div>
                <div className="on-off-button"></div>
              </div>
            </div>
            <div className="setting-config">
              <div className="setting-config-wrapper">
                <div className="setting-config-name">
                  <span>Notification</span>
                </div>
                <div className="on-off-button"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="last-button" onClick={handleSubmit}>
          <button className="ok-button">OK</button>
        </div>
      </div>
    </div>
  );
};

export default TimerSetting;
