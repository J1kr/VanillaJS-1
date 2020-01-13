const weather = document.querySelector(".js-weather");

const API_KEY = '89ef12b58f07a6883ce59bc8b764fa66';
const COORDS = 'coords';

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
       console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}@${place}`    
    }
    );
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(position){
    console.log("Error!!!");
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadCoords = localStorage.getItem(COORDS);
    if (loadCoords === null){
        askForCoords();
    } else {
       const parseCoords = JSON.parse(loadCoords);
       console.log(parseCoords);
       getWeather(parseCoords.latitude , parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}      

init();