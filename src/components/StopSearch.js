import { useNavigate } from "react-router-dom"
import stopService from '../services/stop';
import { useEffect, useState } from 'react';


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
        } else {
            setCurrentStop(stops[currentSearch])
        }
    }

    const StopTile = ({ stopName, stopNumber }) => {
        return (
            <div className="stop-tile">
                <p>{ stopName }</p>
                <p>{ stopNumber }</p>
            </div>
        )
    }

    const StopListing = ({ stops }) => {

        if (Object.keys(stops).length > 0) {
            return (
                <div>
                    <div className="stop-tile">
                        <p>Stop Name</p>
                        <p>Stop Number</p>
                    </div>
                    {stops.slice(0, 20).map((stop) =>
                    <a className="stop-link" onClick={() => {SelectStop(stop)}} key={stop.stop_code} >
                        <StopTile stopName={stop.stop_name} stopNumber={stop.stop_code}  />
                    </a>
                    )}
                </div>
            )
        }
    }

    const SelectStop = (stop) => {
        setCurrentStop(stop)
        navigate('stop')
    }

    return (
        <div>
            <div className="container my-3">
            <h2>Turku traffic</h2>
                <div>
                    <form id="stopNumberForm" onSubmit={handleStopNumberSubmit} >
                        <p>Enter a bus stop number below:</p>
                        <input onChange={handleStopNumberChange} />
                    </form>
                </div>
            </div>
            <StopListing stops={foundStops} />
        </div>
    )
}

export default StopSearch
