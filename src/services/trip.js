import axios from 'axios'
const baseUrl = 'http://data.foli.fi/gtfs/trips'

const getTrip = (trip_id) => {
    const request = axios.get(`${baseUrl}/trip/${trip_id}`)
    return request.then(response => response.data)
}

const getTrips = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

export default { getTrip, getTrips }
