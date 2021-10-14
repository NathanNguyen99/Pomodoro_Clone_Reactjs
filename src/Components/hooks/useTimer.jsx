import { useState, useEffect } from "react";

const useTimer = (count, onFinish) => {
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(count);
    const [seconds, setSeconds] = useState("");
    const [minutes, setMinutes] = useState("");
    const [isStart, setIsStart] = useState(true);

    useEffect(() => {setCounter((count),
        [count.listOfObjects] 
        )
    }, [count])

    useEffect(() => {
        let intervalId;
        // Just given out the timer
        if (isStart) {
            const secondCounter = ((counter)) % 60;
            const minuteCounter = Math.floor(((counter) % 3600) / 60);

            const computedSecond =
                String(secondCounter).length === 1
                    ? `0${secondCounter}`
                    : secondCounter;
            const computedMinute =
                String(minuteCounter).length === 1
                    ? `0${minuteCounter}`
                    : minuteCounter;

            setSeconds(computedSecond);
            setMinutes(computedMinute);
        }

        if (isActive) {
            intervalId = setInterval(() => {
                if (counter >= 1) {
                    setCounter((counter) => counter - 1);
                } else {
                    setIsActive(false);
                    if (onFinish) {
                        onFinish();
                    }
                }

                const secondCounter = counter % 60;
                const minuteCounter = Math.floor((counter % 3600) / 60);

                const computedSecond =
                    String(secondCounter).length === 1
                        ? `0${secondCounter}`
                        : secondCounter;
                const computedMinute =
                    String(minuteCounter).length === 1
                        ? `0${minuteCounter}`
                        : minuteCounter;

                setSeconds(computedSecond);
                setMinutes(computedMinute);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isStart, isActive, counter, onFinish]);

    function pause() {
        setIsActive(false);
    }

    function start() {
        setIsActive(true);
    }

    function reset() {
        setCounter(count);
        setSeconds("00");
        setMinutes("00");
        setIsActive(false);
    }
    return {
        isActive,
        counter,
        seconds,
        minutes,
        pause,
        start,
        reset,
        setCounter,
    };
};

export default useTimer