import axios from 'axios'
const baseUrl = 'http://data.foli.fi/gtfs/trips/trip'

const getTrip = (trip_id) => {
    const request = axios.get(`${baseUrl}/${trip_id}`)
    return request.then(response => response.data)
}

export default { getTrip }
