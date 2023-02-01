import axios from 'axios'
const baseUrl = 'http://data.foli.fi/gtfs/calendar_dates'

const getCalendarDates = () => {
    const request = axios.get(baseUrl)
    return request.then(respose => respose.data)
}

export default { getCalendarDates } 
