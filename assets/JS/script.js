




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


function getCityWeather(event){
    event.preventDefault();
        var cityNameInput = document.querySelector('#cityname').value;
        console.log(cityNameInput);

    
        var queryUrlCurrent = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityNameInput + '&appid=' + apiKey;

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
            cityName.append("<li>" + cityData.name + "</li>");

        })
    }  
};

searchBtnEl.addEventListener("click" , getCityWeather);
    




















//     var cityInputEl = $('#cityname');
//     var searchBtnEl = $('.btn');

//     var apiKey = "51fef5a92ee5ae575931b196ffbfb438";
    


// searchBtnEl.click(function() {
// var cityInput = $('#cityname').val().trim();
// console.log(cityInput);
// var requestUrl = 'api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=' + apiKey;

// if (cityInput == "") {
//     console.log(cityInput);
// } else {
//     fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data)
//     });
// }



// })


// var cityData;
// var cityWeather;

// function getCityWeatherFromName(name){
//     //construct request URL to get city coordinates from name
//     var requestCityCoordinates = "http://api.openweathermap.org/data/2.5/weather?q="+name+"&appid=51fef5a92ee5ae575931b196ffbfb438";
//     //call the server API to get city coordinates from name
//     fetch(requestCityCoordinates)
//     .then(function (response) {
//     return response.json();
//     })
//     .then(function (data) {
//     cityData = data;
//     console.log(cityData);
//     //get the weather data using coordinates obtained
//     getCityWeather(cityData.coord.lat, cityData.coord.lon);
//     });
// }

// function getCityWeather(lat, lon){
    
//         //construct request URL to get city weather info from coordinates
//         var requestCityWeather = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=51fef5a92ee5ae575931b196ffbfb438";    
//         fetch(requestCityWeather)
//         .then(function (response){
//             return response.json();
//         })
//         .then(function(weather){
//             cityWeather = weather;

//             //****next should be calling a function to update the GUI with from cityWeather variable***//

//         });
