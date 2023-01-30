import axios from 'axios'
const baseUrl = 'http://data.foli.fi/gtfs/v0/20230119-163758/stops'

const getStops = () => {
    const request = axios.get('http://data.foli.fi/gtfs/v0/20230119-163758/stops')
    return request.then(respose => respose.data)
}

export default { getStops } 
