
var cityInputEl = document.querySelector('#cityname');
var searchBtnEl = document.querySelector('.btn');

var apiKey = "51fef5a92ee5ae575931b196ffbfb438";
var cityData;
// var cityWeather;

// Forloop for persisting the data onto HMTL page
for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    // console.log(localStorage.getItem("City"));
    var cityNameButton = $("#cities-buttons").addClass("list-group-item");

    cityNameButton.append("<button>" + city + "</button>");
}
var keyCount = 0;

function getCityWeather(event){
    event.preventDefault();
        var cityNameInput = document.querySelector('#cityname').value;
        console.log(cityNameInput);

    
        var queryUrlCurrent = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityNameInput + '&appid=' + apiKey + '&units=metric';

        var requestFiveDaysUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityNameInput + '&appid=' + apiKey;

    if (cityNameInput == "") {
        console.log(cityNameInput)
    } else {
        fetch(queryUrlCurrent)
         .then(function(response){
            return response.json();
        })
        .then(function(data){
            cityData = data;
            console.log(cityData);
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<button>" + cityData.name + "</button>");

            var local = localStorage.setItem(keyCount, cityData.name);
          
            keyCount += 1;

         //start current weather append
        var currentWeatherCard =  $(".currentCard").append("<div>").addClass("card-body");
        currentWeatherCard.empty();
        var currentName = currentWeatherCard.append("<p>");
        currentWeatherCard.append(currentName); 
        
        var unixFormat = moment.unix(cityData.dt).format("DD/MM/YYYY");
        currentName.append(cityData.name + " " + unixFormat);
        var weatherIcon = cityData.weather[0].icon;
        currentName.append(`<img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png">`);

        var currentTemp = currentName.append("<p>");
        currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + cityData.main.temp + " C" +"</p>");
            // Add Humidity
            currentTemp.append("<p>" + "Humidity: " + cityData.main.humidity + " %" + "</p>");
            // // Add Wind Speed: 
            currentTemp.append("<p>" + "Wind Speed: " + cityData.wind.speed + " KPH" + "</p>");

        
        })
    }  
};

searchBtnEl.addEventListener("click" , getCityWeather);
    