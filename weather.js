const key = "643421ffe547c0daff0354cda39b924f";
let getcountry;
const options = document.querySelector(".options");
const btn = document.querySelector(".btn");
const userinput = document.querySelector(".userinput");
const placename = document.querySelector(".placename");
const conditionofweather = document.querySelector(".conditionofweather");
const icon = document.querySelector("#icon");
const temp = document.querySelector(".temp");
const maxtemp = document.querySelector(".maxtemp");
const mintemp = document.querySelector(".mintemp");
const main = document.querySelector(".main-wrapper");
const fa = document.querySelector(".fa");


async function getdatafromserver(){

    //get country through user input
    const response = fetch(getcountry);
    const data = await (await response).json();

    if(data.length != 0){
    //get the lattitude and longitude from the user inputeed country
    const lat = data[0].lat;
    const lon = data[0].lon;    

    //get weatehr ofg place according to the lattittude and longitutde

    const weather_res = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
    const weather_data = await (await weather_res).json();

    console.log(weather_data);
    //show data

    placename.innerHTML = `
    ${weather_data.name}<sup>${weather_data.sys.country}</sup>
    `;

    conditionofweather.innerText = `${weather_data.weather[0].description}`;
    
    fa.style.opacity = "0";
    

    icon.style.opacity = "1";

    icon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${weather_data.weather[0].icon}@2x.png)`;
    
    temp.style.transform = "translate(0rem, 0rem)";
    temp.innerHTML = `${ (parseFloat(weather_data.main.feels_like) - 273.15).toPrecision(2)}<sup>°</sup>C`

    maxtemp.innerHTML = `MaxTemp <br> ${(parseFloat(weather_data.main.temp_max) - 273.15).toPrecision(2)}<sup>°</sup>C `;

    mintemp.innerHTML = `MinTemp <br> ${(parseFloat(weather_data.main.temp_min) - 273.15).toPrecision(2)}<sup>°</sup>C `;

    }else{
        placename.innerText = '';
        conditionofweather.innerText = '';
        icon.style.opacity = "0";
        fa.style.opacity = "1";
        fa.innerHTML = "&#xf188";
        temp.style.fontSize = "1.5rem";
        temp.style.transform = "translate(0rem, 5rem)";
        temp.innerText = "not a valid country!!";
        maxtemp.innerText = '';
        mintemp.innerText = '';

    }


}   

function sendcountryname(){
    getcountry = `http://api.openweathermap.org/geo/1.0/direct?q=${userinput.value}&appid=${key}`;
    getdatafromserver();
}

