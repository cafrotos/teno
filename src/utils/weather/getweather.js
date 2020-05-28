// import { KEY } from "./editable";
let KEY = '1effc7a398ae1e31209ba251242911d9'

let allData = {
    "name" : "null",
    "main" : {"temp" : "null"},
    "weather" : {"icon" : "null"}
};

export function getWeather() {
    
    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
    };
        
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let URL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + KEY;
        fetch(URL)
            .then(res => res.json())
            .then((data) => {
                allData = data;    
            });
    }, error, options);
            
    function error() {
        console.log("something is wrong");    
    }   

}

export function getData() {
    this.city = allData.name;
    this.tempF = allData.main.temp;
    this.icon = allData.weather.icon;
}
