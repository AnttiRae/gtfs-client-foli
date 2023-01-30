import { useNavigate } from "react-router-dom"

// import stoptimesservice

const StopSearch = (props) => {
    const navigate = useNavigate()

    const handleStopNumberChange = (event) => {

    }

    const handleStopNumberSubmit = (event) => {
        event.preventDefault()

    }

    return (
        <div>
            <div className="container my-3">
                <h2>Turku traffic</h2>
            </div>
            <div className="d-flex justify-content-center align-items-center customer-number-input">
                <div>
                    <form id="customerNumberForm" onSubmit={handleStopNumberSubmit} >
                        <p>Bus Stop Number</p>
                        <input onChange={handleStopNumberChange} />
                    </form>
                    <div className="d-flex justify-content-end my-3">
                        <button type="submit" form="customerNumberForm">Look up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StopSearch
