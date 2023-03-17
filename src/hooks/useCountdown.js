import { useEffect, useState } from 'react'

export function useCountdown({ initTime, totalTime, onFinish }) {
	const [time, setTime] = useState(totalTime)

	useEffect(() => {
		let leftTime

		if (time <= 0) {
			clearInterval(leftTime)

			setTime(totalTime)
			onFinish('defeat')
		}

		if (initTime !== 0) {
			leftTime = setInterval(() => {
				setTime((time) => time - 1000)
			}, 1000)
		}

		return () => clearInterval(leftTime)
	}, [initTime, time])

	return time
}
