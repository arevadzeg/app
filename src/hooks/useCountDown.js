import { useEffect, useState } from "react"

const timeUnitsBetween = (startDate, endDate) => {
    let delta = Math.abs(endDate - startDate) / 1000
    const isNegative = startDate > endDate ? -1 : 1
    return [
        ["days", 24 * 60 * 60],
        ["hours", 60 * 60],
        ["minutes", 60],
        ["seconds", 1],
    ].reduce((acc, [key, value]) => (acc[key] = Math.floor(delta / value) * isNegative, delta -= acc[key] * isNegative *
        value, acc), {})
}

const useCountDown = (endDate) => {
    const [countDownState, setCountDownState] = useState({
        seconds: 0,
        minutes: 0,
        hours: 0,
    })

    useEffect(() => {
        const intevalId = setInterval(() => setCountDownState(timeUnitsBetween(new Date(), endDate)), 1000)
        return () => clearInterval(intevalId)
    }, [setCountDownState, endDate])

    return countDownState
}

export default useCountDown