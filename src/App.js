import StopSearch from './components/StopSearch'
import SingleStop from './components/SingleStop'
import calendarDatesService from "./services/calendarDates";
import {
    BrowserRouter as Router,
    Routes, Route
} from "react-router-dom"

import { useEffect, useState } from 'react';

function App() {
    const [currentStop, setCurrentStop] = useState({})
    const [calendarDates, setCalendarDates] = useState({})

    useEffect(() => {
        calendarDatesService.getCalendarDates()
            .then((calendarDates) => {
                setCalendarDates(calendarDates)
            })
    }, [])


    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<StopSearch currentStop={currentStop} setCurrentStop={setCurrentStop} />} />
                    <Route path="/stop" element={<SingleStop currentStop={currentStop} calendarDates={calendarDates} />} />
                </Routes>
            </Router>
        </div>
    )
}
export default App;