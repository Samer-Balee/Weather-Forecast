
var cityInputEl = document.querySelector('#cityname');
var searchBtnEl = document.querySelector('.btn');

var apiKey = "51fef5a92ee5ae575931b196ffbfb438";
var cityData;

// var cityWeather;

// Forloop for persisting the data onto HMTL page
// for (var i = 0; i < localStorage.length; i++) {

//     var city = localStorage.getItem(i);
//     // console.log(localStorage.getItem("City"));
//     var cityNameButton = $("#cities-buttons").addClass("list-group-item");

//     cityNameButton.append("<button>" + city + "</button>");
// }
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
        currentWeatherCard.append("<h3>" + cityData.name + " " + unixFormat + "<h3>");
        var weatherIcon = cityData.weather[0].icon;
        currentWeatherCard.append(`<img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png">`);

        var currentTemp = currentName.append("<p>");
        currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + cityData.main.temp + " C" +"</p>");
            // Add Humidity
            currentName.append("<p>" + "Humidity: " + cityData.main.humidity + " %" + "</p>");
            // // Add Wind Speed: 
            currentName.append("<p>" + "Wind Speed: " + cityData.wind.speed + " Km/h" + "</p>");

            var lat = cityData.coord.lat;
            console.log(lat);
            var lon =  cityData.coord.lon;

            var urlUV = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + apiKey;
            fetch(urlUV)
         .then(function(response){
            return response.json();
        }) .then(function(data){
            var currentUV = currentTemp.append("<p>" + "UV Index: " + data.current.uvi + "</p>").addClass("card-text");
            currentUV.addClass("UV");
            currentTemp.append(currentUV);

            var fiveDaysDiv = $(".fiveDayOne").addClass("card-text");
            fiveDaysDiv.empty();
           for (i = 1 ; i < 6 ; i ++) {
               
               var fiveDayDate = moment.unix(data.daily[i].dt).format("DD/MM/YYYY");
               fiveDaysDiv.append("<div class=fiveDayColor>" + "<p>" + fiveDayDate + "</p>" + `<img src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + data.daily[i].temp.max + "</p>" + "<p>" + "Humidity: " + data.daily[i].humidity + "%" + "</p>" + "</div>");
           } 
            

        })
        
        })
    }  
};

searchBtnEl.addEventListener("click" , getCityWeather);
    