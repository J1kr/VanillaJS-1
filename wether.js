const API_KEY = '89ef12b58f07a6883ce59bc8b764fa66';
const COORDS = 'coords';

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
        //getWeather
    }
}

function init(){
    loadCoords();
}      

init();