import { useNavigate } from "react-router-dom"
import stopService from '../services/stop';
import { useEffect, useState } from 'react';


// import stoptimesservice

const StopSearch = ({ currentStop, setCurrentStop}) => {
    const navigate = useNavigate()

    const [stops, setStops] = useState({})
    const [currentSearch, setCurrentSearch] = useState('')
    const [foundStops, setFoundStops] = useState([])

    useEffect(() => {
        stopService
            .getStops()
            .then(stops => {
                setStops(stops)
            })
    }, [])

    const handleStopNumberChange = (event) => {
        setCurrentSearch(event.target.value)

    }

    useEffect(() => {
        if (currentSearch.length > 0) {
            setFoundStops(Object.values(stops).filter(e => {
                return e.stop_code.startsWith(currentSearch);
            }))
        } else {
            setFoundStops([])
        }
    }, [currentSearch])

    const handleStopNumberSubmit = (event) => {
        event.preventDefault()
        if (stops[currentSearch] === undefined) {
            console.log("stop not found")
        } else {
            setCurrentStop(stops[currentSearch])
            console.log(currentStop)
        }
    }

    const StopTile = ({ stopName, stopNumber }) => {
        return (
            <li>
                <h1>{ stopName }</h1>
                <h2>{ stopNumber }</h2>
            </li>
        )
    }

    const StopListing = ({ stops }) => {

        return (
            <div>
                <ul>
                    {stops.slice(0, 5).map((stop) =>
                    <a onClick={() => {SelectStop(stop.stop_code)}} key={stop.stop_code} >
                        <StopTile stopName={stop.stop_name} stopNumber={stop.stop_code}  />
                    </a>
                    )}
                </ul>
            </div>
        )
    }

    const SelectStop = (stop) => {
        setCurrentStop(stop)
        navigate('stop')
    }

    return (
        <div>
            <div className="container my-3">
                <h2>Turku traffic</h2>
            </div>
            <div className="d-flex justify-content-center align-items-center stop-number-input">
                <div>
                    <form id="stopNumberForm" onSubmit={handleStopNumberSubmit} >
                        <p>Bus Stop Number</p>
                        <input onChange={handleStopNumberChange} />
                    </form>
                </div>
            </div>
            <StopListing stops={foundStops} />
        </div>
    )
}

export default StopSearch
