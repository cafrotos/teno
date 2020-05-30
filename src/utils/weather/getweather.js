import { KEY } from "./editable";
import axios from "axios";
import Geolocation from '@react-native-community/geolocation';

const getPosition = () => new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
        (position) => {
            resolve([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
            reject(error)
        },
        {
            enableHighAccuracy: false,
            timeout: 5000,
        }
    )
})

const getWeatherByLocation = (latitude, longitude) => new Promise((resolve, reject) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + KEY;
    axios.get(url)
    .then(res => {
        resolve(res.data)
    })
    .catch(e => {
        reject(e)
    })
})

export const getWeather = async () => {
    const [latitude, longitude] = await getPosition()
    let data = await getWeatherByLocation(latitude, longitude)
    return data
}