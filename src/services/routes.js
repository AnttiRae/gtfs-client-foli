import axios from 'axios'
const baseUrl = 'http://data.foli.fi/gtfs/routes'

const getRoutes = () => {
    const request = axios.get(baseUrl)
    return request.then(respose => respose.data)
}

export default { getRoutes } 
