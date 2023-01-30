import StopSearch from './components/StopSearch'
import stopService from './services/stop';
import {
    BrowserRouter as Router,
    Routes, Route
} from "react-router-dom"

import { useEffect, useState } from 'react';

function App() {
    const [currentStop, setCurrentStop] = useState({})
    const [stops, setStops] = useState({})

    useEffect(() => {
        stopService
            .getStops()
            .then(stops => {
                setStops(stops)
            })
    }, [])

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<StopSearch currentStop={currentStop} />} />
                </Routes>
            </Router>
        </div>
    )
}
export default App;