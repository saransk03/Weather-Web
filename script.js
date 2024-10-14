var   btnElement = document.getElementById("btn");
const searchCity = document.querySelector(".search-bar input");
const containerBox = document.querySelector(".container")
const errorElement = document.querySelector(".error");
const weatherInfo = document.getElementById("w-info")

btnElement.addEventListener('click', () => {
    climateData(searchCity.value);
    searchCity.value = "";
})


// Api call ;


const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=" 
// const apiKey = "c40b80e756ffd00e3e25ae6f8217a87d"

async function climateData(city){
     
    const response = await fetch(apiUrl + city + '&appid=c40b80e756ffd00e3e25ae6f8217a87d')

   if(response.status == 404){
    errorElement.style.visibility = "visible";
    errorElement.style.opacity = 1;
    weatherInfo.style.visibility = "hidden";
    
    if (window.matchMedia("(max-width: 480px)").matches) {
        containerBox.style.height = "420px"; // Height for mobile screens in error state
    } else {
        containerBox.style.height = "450px"; // Height for larger screens in error state
    }
   }else{
    errorElement.style.visibility = "hidden";
    weatherInfo.style.visibility = "visible";
    weatherInfo.style.opacity = 1;
    var data = await response.json();

    document.querySelector(".city").textContent = data.name
    document.querySelector(".temperature").textContent = Math.round(data.main.temp) + "°C"
    document.querySelector(".climate").textContent = data.weather[0].main;
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = Math.round(data.wind.speed) + "Km/Hr" 

   if(data.weather[0].main == "Rain"){
    document.getElementById("image").src = "./Assests/rain.png"
   }else if(data.weather[0].description == "overcast clouds"){
    document.getElementById("image").src = "./Assests/cloud.png"
   }else if(data.weather[0].main == "Clear"){
    document.getElementById("image").src = "./Assests/clear.png"
   }else if(data.weather[0].main == "Haze" || data.weather[0].main =="Smoke" || data.weather[0].main == "Mist"){
    document.getElementById("image").src = "./Assests/fog.png"
   }else if(data.weather[0].main == "Clouds"){
    document.getElementById("image").src = "./Assests/overcast.png"
   }else if(data.weather[0].main == "Thunderstorm"){
    document.getElementById("image").src = "./Assests/thunderstorm.png"
   }


    if (window.matchMedia("(max-width: 480px)").matches) {
        containerBox.style.height = "480px"; // Height for mobile screens
    } else {
        containerBox.style.height = "550px"; // Height for larger screens
    }

    console.log(window.matchMedia("(max-width: 480px)"))
   }

   


}
