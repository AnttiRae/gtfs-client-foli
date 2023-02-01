import axios from 'axios'
const baseUrl = 'http://data.foli.fi/gtfs/stop_times/stop'

const getStopTimes = (stop_code) => {
    const request = axios.get(`${baseUrl}/${stop_code}`)
    return request.then(response => response.data)
}

export default { getStopTimes }
