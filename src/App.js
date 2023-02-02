import StopSearch from './components/StopSearch'
import SingleStop from './components/SingleStop'
import calendarDatesService from "./services/calendarDates";
import tripsService from "./services/trip"
import {
    BrowserRouter as Router,
    Routes, Route
} from "react-router-dom"
import { useEffect, useState } from 'react';
import './App.css'

function App() {
    const [currentStop, setCurrentStop] = useState({})
    const [calendarDates, setCalendarDates] = useState({})
    const [trips, setTrips] = useState([])

    useEffect(() => {
        calendarDatesService.getCalendarDates()
            .then((calendarDates) => {
                setCalendarDates(calendarDates)
            })
        tripsService.getTrips()
            .then(trips => {
                setTrips(trips)
            })
    }, [])


    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<StopSearch currentStop={currentStop} setCurrentStop={setCurrentStop} />} />
                    <Route path="/stop" element={<SingleStop currentStop={currentStop} calendarDates={calendarDates} trips={trips} />} />
                </Routes>
            </Router>
        </div>
    )
}
export default App;