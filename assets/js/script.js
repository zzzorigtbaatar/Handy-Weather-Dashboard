var searchHistEl = $('#history-list');
var weatherDataEl = $('#current-weather-data');
var searchInput = $('#search-input');
// var searchFormEl = $('#search-form');
var searchBtnEl = $('#search-btn');

var cityTitleEl = $('#current-city-title');
var historyListEl = $('#history-list');


var cityName = "";
var cityState = "";
var cityCountry = "";
var cityLat = 0;
var cityLon = 0;
var searchHistList = [];

function init(){
    displaySearchHistory;
}


function handleSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#search-input').value;
    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }

    console.log("this is the input value: " + searchInputVal);

    var searchQueryURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchInput.val() + '&APPID=a6b011df2ef4ad0af87f542febbabcd1';

    displayLocation(searchQueryURL);
}

function displayLocation(searchQueryURL) {
    fetch(searchQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            cityName = data[0].name;
            cityState = data[0].state;
            cityCountry = data[0].country;
            cityLat = data[0].lat;
            cityLon = data[0].lon;

            var queryWeatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=imperial&APPID=4cf13e749504309d50ec21fe5fae86a6';

            getWeatherIcon(queryWeatherURL);



        })
        .catch(function (error) {
            console.error(error);
        });
}

//displays city name with current weather's icon
function getWeatherIcon(queryWeatherURL) {
    fetch(queryWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cityTitleEl.html(cityName + ', ' + cityState + ', ' + cityCountry + " (" + moment().format("MM/DD/YYYY") + ") <img id='currentIcon' src='https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png' />");

            searchHistList.push({ name: cityName + ', ' + cityState, latitude: cityLat, longitude: cityLon });
            localStorage.setItem('search-history', JSON.stringify(historyListEl));
            displaySearchHistory();
            displayWeatherForecast(data);
            searchInput.val("");
        })
        .catch(function (error) {
            console.error(error);
        });

}

//displays previous searches if there are any in local storage
function displaySearchHistory(){
    searchHistEl.html("");
    for (i = 0; i < searchHistList.length; i++) {
        searchHistEl.prepend('<li class="list-group-item" data-lat="' + searchHistList[i].latitude + '" data-lon="' + searchHistList[i].longitude + '">' + searchHistList[i].name + '</li>');
    }
}

//displays current weather and forecast to page
function displayWeatherForecast(data){
    $('#currentTemp').text(data.current.temp + '°F');
    $('#currentWind').text(data.current.wind_speed + 'MPH');
    $('#currentHum').text(data.current.humidity + '%');
    $('#currentUVI').html(data.current.uvi);
    $('#currentUVI').removeClass('favorable moderate severe');
        if (data.current.uvi > 6) {
            $('#currentUVI').addClass('severe');
        } else if (data.current.uvi > 2) {
            $('#currentUVI').addClass('moderate');
        } else {
            $('#currentUVI').addClass('favorable');
        }
        for(var i =1; i < 6; i++){
            $('#date-day' + i).html(moment.unix(data.daily[i].dt).format("MM/DD/YYYY"));
            $('#icon-day' + i).attr("src", 'https://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '.png');
            $('#temp-day' + i).html('Temp: ' + data.daily[i].temp.max + '°F');
            $('#wind-day' + i).html('Wind: ' + data.daily[i].wind_speed + ' MPH');
            $('#hum-day' + i).html('Humidity: ' + data.daily[i].humidity + '%');
        }

}
// searchFormEl.addEventListener('submit', handleSubmit);
searchBtnEl.click(handleSubmit);

init();