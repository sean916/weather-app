// API key
// 753655f036a8a77b02bfd554a11e63f1
// http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=753655f036a8a77b02bfd554a11e63f1

let cityName;
let cityData;
let processedData = {};
const apiKey = "753655f036a8a77b02bfd554a11e63f1";

async function grabData() {
    try {
        cityName = document.getElementById("cityName").value;

        let div = document.querySelector(".data");
        div.innerHTML = "<img src='./loading.gif' />";

        let thisURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey;
        const getCity = await fetch(`${thisURL}`, {mode: 'cors'})
        cityData = await getCity.json();

        processData(cityData);
        render();

    } catch (err) {
        alert("Please enter a valid location.");
    }
}

function processData(data) {
    processedData.city = data.name;
    processedData.country = data.sys.country;
    processedData.description = capitalizeFirst(data.weather[0].description);
    processedData.temp = Math.round(KtoF(data.main.temp) * 10) / 10;
    return processedData;
}

function render() {
    let div = document.querySelector(".data");
    div.innerHTML = "";
    let header = document.createElement("h1");
    header.innerHTML = `${processedData.city}` + ', ' + `${processedData.country}`;
    div.appendChild(header);
    
    let descriptor = document.createElement("h3");
    descriptor.innerHTML = `${processedData.description}`;
    div.appendChild(descriptor)

    let temp = document.createElement("h2");
    temp.innerHTML = `${processedData.temp}` + " F";
    div.appendChild(temp);
}

function KtoF(x) {
    return x * (9 / 5) - 459.67;
}

function capitalizeFirst(str) {
    return str.toString().charAt(0).toUpperCase() + str.toString().slice(1);
}