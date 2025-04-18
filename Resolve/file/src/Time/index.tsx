import React, { useState, useEffect, useRef } from 'react'

enum TimeState {
    Start,
    Stop,
}
function Time() {
    const [state, setState] = useState<number>(TimeState.Stop)
    const [time, setTime] = useState<number>(0)
    const [timeStep, setTimeStep] = useState<number>(1)

    const timer = useRef<number>()

    useEffect(() => {
        if (state == TimeState.Start) {
            clearInterval(timer.current)
            timer.current = setInterval(() => {
                setTime(time => time + timeStep)
            }, 1000)
        } else {
            clearInterval(timer.current)
        }
    }, [state, timeStep])

    return (
        <>
            <div>{time}</div>
            <button
                onClick={() => {
                    if (state == TimeState.Stop) {
                        setState(TimeState.Start)
                    } else {
                        setState(TimeState.Stop)
                    }
                }}
            >
                {state == TimeState.Stop && '开始计时'}
                {state == TimeState.Start && '结束'}
            </button>
            <div>
                步进:{timeStep}
                <button
                    onClick={() => {
                        setTimeStep(timeStep + 1)
                    }}
                >
                    +
                </button>
                <button
                    onClick={() => {
                        setTimeStep(timeStep - 1)
                    }}
                >
                    -
                </button>
            </div>
        </>
    )
}

export default Time
