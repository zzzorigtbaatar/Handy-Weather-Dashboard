var searchHistEl = $('#history-list');
var weatherDataEl = $('#current-weather-data');
// var searchInput = $('#search-input');
var searchFormEl = $('#search-form');
var searchBtnEl = $('#search-btn');


function handleSubmit(event){
    event.preventDefault();

    var searchInputVal = document.querySelector('#search-input').value;
    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
      }
      console.log("this is the input value: " + searchInputVal);
}

// searchFormEl.addEventListener('submit', handleSubmit);
searchBtnEl.click(handleSubmit);