import StopSearch from './components/StopSearch'
import SingleStop from './components/SingleStop'

import {
    BrowserRouter as Router,
    Routes, Route
} from "react-router-dom"

import { useState } from 'react';

function App() {
    const [currentStop, setCurrentStop] = useState({})


    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<StopSearch currentStop={currentStop} setCurrentStop={setCurrentStop} />} />
                    <Route path="/stop" element={<SingleStop currentStop={currentStop} />} />
                </Routes>
            </Router>
        </div>
    )
}
export default App;