var searchHistEl = $('#history-list');
var weatherDataEl = $('#current-weather-data');
var searchInput = $('#search-input');
// var searchFormEl = $('#search-form');
var searchBtnEl = $('#search-btn');


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
            
        })
        .catch(function (error) {
            console.error(error);
        });
}
// searchFormEl.addEventListener('submit', handleSubmit);
searchBtnEl.click(handleSubmit);