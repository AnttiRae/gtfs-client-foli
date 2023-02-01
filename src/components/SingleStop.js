import { useNavigate } from "react-router-dom";
import stopTimesService from '../services/stopTimes';
import tripService from '../services/trip';
import { useEffect, useState } from 'react';

const StopInfo = ({ stop }) => {
    return (
        <div>
            <p>Bus Stop: {stop.stop_code} - {stop.stop_name}</p>
        </div>
    )
}

const StopTimesList = ({ stopTimes, calendarDates }) => {
    if (Object.keys(stopTimes).length > 0) {
        return (
            <div>
                {stopTimes.map(time => 
                    <StopTimesInfo stopTime={time} calendarDates={calendarDates} />
                )}
            </div>
        )
    } else {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

}

const StopTimesInfo = ({ stopTime, calendarDates }) => {
    const [trip, setTrip] = useState({})

    useEffect(() => {
        tripService.getTrip(stopTime.trip_id)
            .then(trip => setTrip(trip[0]))
    }, [])

    const drivingToday = () => {
        const today = new Date(Date.now()).toLocaleString('af-ZA', {year: 'numeric', month: '2-digit', day: '2-digit'}).split(', ')[0].replaceAll('-', '') 
        return calendarDates[trip.block_id].find(e => e.date === today)

    }
    if (Object.keys(trip).length > 0) {
        if (drivingToday()) {
            return (
                <div>
                    <p>{stopTime.departure_time}</p>
                    <p>{trip.trip_headsign}</p>
                    <br></br>
                </div>
            )
        }
    }
}


const SingleStop = ({ currentStop, calendarDates }) => {
    const navigate = useNavigate()

    const [stopTimes, setStopTimes] = useState({})

    useEffect(() => {
        if (Object.keys(currentStop).length === 0) {
            navigate('/')
        } else {
            stopTimesService.getStopTimes(currentStop.stop_code)
                .then(stopTimes => {
                    const currentTime = new Date().toLocaleTimeString('en-us', {hour12: false})
                    setStopTimes(stopTimes.filter((e) =>{
                        return e.departure_time > currentTime
                    }))
                })
        }
    }, [])


    return (
        <div>
            <StopInfo stop={currentStop} />
            <StopTimesList stopTimes={stopTimes} calendarDates={calendarDates} />
        </div>
    )
}

export default SingleStop