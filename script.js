const apikey = `495c3d5e7660ba6b18b806d911221769`;

const cityInput = document.querySelector(".cityInput");
const weatherForm = document.querySelector(".weatherForm");
const card = document.querySelector(".card");
const button = document.querySelector("button");
const endingline = document.querySelector(".endingline");


weatherForm.addEventListener("submit",async (event)=>{
    event.preventDefault();
    let city = cityInput.value;

    button.style.scale = 0.8;
    card.style.scale = 0.9;

    setTimeout(()=>{
        button.style.scale = 1;
        card.style.scale = 1;
    },100);

    cityInput.value = '';
    
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            weatherDisplay(weatherData);
        }
        catch(error){
            console.error(error);
            errorDisplay(error);
        }
    }
    else{
        errorDisplay("Please enter City Name");
    }
});


async function getWeatherData(city){

    const Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(Url);
    // console.log(response);
    if(!response.ok){
        throw new Error("City not found ❓");

    }
    return await response.json();
}

function weatherDisplay(weatherData){
    const name = weatherData.name;
    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const description = weatherData.weather[0].description;
    const id = weatherData.weather[0].id;
    const windspeed = weatherData.wind.speed;

    card.style.display = "flex";
    card.textContent = "";  

    const cityName = document.createElement("h1");
    const weatherEmoji = document.createElement("p");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const windspeedDisplay = document.createElement("p");
    const weatherMsg = document.createElement("p");

    cityName.textContent = name;
    weatherEmoji.innerText = getWeatherEmoji(id);    
    tempDisplay.innerText = `Temp° : ${(temp - 273.15).toFixed(1)}`;
    humidityDisplay.innerText = `Humidity : ${humidity}%`;
    windspeedDisplay.innerText = `Windspeed : ${(windspeed * 3.6).toFixed(1)} km/h`;
    weatherMsg.innerText = description;

    cityName.classList.add("cityName");
    weatherEmoji.classList.add("weatherEmoji");
    tempDisplay.classList.add("temprature");
    humidityDisplay.classList.add("humidity");
    windspeedDisplay.classList.add("windspeed");
    weatherMsg.classList.add("weatherMsg");

    card.append(cityName);
    card.append(weatherEmoji);
    card.append(tempDisplay);
    card.append(humidityDisplay);
    card.append(windspeedDisplay);
    card.append(weatherMsg);
}


function errorDisplay(message){
    const errorMsg = document.createElement("p");
    card.textContent = "";
    errorMsg.textContent = message;
    errorMsg.classList.add("errorMsg");
    card.style.display = "flex";
    card.appendChild(errorMsg);

}

function getWeatherEmoji(id){

    switch(true){
        case(id>=200 && id<300):
            return "⛈️";
        
        case(id>=300 && id<400):
            return "🌧️";
        
        case(id>=500 && id<600):
            return "🌧️";

        case(id>=600 && id<700):
            return "☃️";
        
        case(id>=700 && id<800):
            return "🌫️";

        case(id===800):
            return "☀️";

        case(id>=800 && id<810):
            return "⛅";

        default:
            return "❓";
        
    }

}

endingline.addEventListener("click",()=>{
    window.open("https://github.com/aadityagi21");
})