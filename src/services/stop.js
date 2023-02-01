import axios from 'axios'
const baseUrl = 'http://data.foli.fi/gtfs/stops'

const getStops = () => {
    const request = axios.get(baseUrl)
    return request.then(respose => respose.data)
}

export default { getStops } 
