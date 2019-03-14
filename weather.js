const weather = document.querySelector(".js-weather");
const COORDS = 'coords';
const API_KEY ="08ffbb66cdef30616cc84db349c655aa";

function getWeather(lat, long){
    //데이터를 얻을때 fetch라는것을 사용한다
    //fetch안에 가져올 데이터를 넣어주면됨
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}&units=metric`
    ).then(function(response){
        //response만 보여주면 network 정보만 보여줘 하지만 response.json하면 다른것도 더 보여줌
        //javascript에서 뭔가 끝나길 기다리는것은 then함수를 써주면됨
        return response.json();
    }).then(function(json){
        //json이 끝나면 처리할 부분
        const temp = json.main.temp
        const place = json.name
        weather.innerText = `${temp} @ ${place}`
    })
    //then은 데이터가 우리한테 넘어왔을 때 시간이 걸리는데 데이터가 다 완전히 넘어오고나서 그리고 함수를 호출하는것

}

function saveCoords(coordsobj){
    localStorage.setItem(COORDS, JSON.stringify(coordsobj))
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj  = {
        latitude,
        longitude
    };
    //obj를 만드는데 변수이름하고 변수값이 이름이 같으면 저렇게 하나만 써도 됨 얘가 알아서 처리함.
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('cant access geo location')
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
        //위에걸 하면 inspection에서 network로가면 가져오는것을 볼 수 있음.
        //저 getWeather함수에서 fetch함수를 사용하면 그 후에 .then()을 사용해야해 
        
    }
}

function init(){
    loadCoords(); 
}

init()