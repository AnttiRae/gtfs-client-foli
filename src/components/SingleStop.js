import { useNavigate } from "react-router-dom";
import stopTimesService from '../services/stopTimes';
import routesService from '../services/routes'
import { useEffect, useState } from 'react';

const StopInfo = ({ stop }) => {
    return (
        <div className="text-center my-5">
            <h3>Bus Stop: {stop.stop_code} - {stop.stop_name}</h3>
        </div>
    )
}

const StopTimesList = ({ stopTimes, calendarDates, trips }) => {
    const [routes, setRoutes] = useState([])

    useEffect(() =>{
        routesService.getRoutes()
            .then(routes => {
                return setRoutes(routes);
            })
    }, [routes])


    if (Object.keys(stopTimes).length > 0) {
        return (
            <ul>
                <li>
                    <p>Line</p>
                    <p>Departure Time</p>
                    <p>Headsign</p>
                </li>
                {stopTimes.map((time, index) => 
                    <StopTimesInfo stopTime={time} calendarDates={calendarDates} routes={routes} key={index} trips={trips}/>
                )}
            </ul>
        )
    } else {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

}

const StopTimesInfo = ({ stopTime, calendarDates, routes, trips }) => {

    const findTrip = (tripID) => {
        return trips.find(e => {
            return e.trip_id === tripID
        })
    }

    const trip = findTrip(stopTime.trip_id)

    const drivingToday = () => {
        const today = new Date(Date.now()).toLocaleString('af-ZA', {year: 'numeric', month: '2-digit', day: '2-digit'}).split(', ')[0].replaceAll('-', '')
        return calendarDates[trip.block_id].find(e => e.date === today)
    }

    const routeShortName = (routeID) => {
        return routes.find(e => {
            return e.route_id === routeID
        }).route_short_name
    }

    if (drivingToday()) {
        return (
            <li>
                <p>{routeShortName(trip.route_id)}</p>
                <p>{stopTime.departure_time.slice(0, -3)}</p>
                <p>{trip.trip_headsign}</p>
            </li>
        )
    }
}


const SingleStop = ({ currentStop, calendarDates, trips }) => {
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
            <StopTimesList stopTimes={stopTimes} calendarDates={calendarDates} trips={trips} />
        </div>
    )
}

export default SingleStop