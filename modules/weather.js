var getJSON = require('../src/getJSON');
var config = require('../config/config.js');
var manageDOM = require('../src/manageDOM');

// If user did not specify location the function returns default location from config file.
function getLocation(place)
{
	if (!place) return (config.location)
	return (place)
}

// If user did not specify units the function returns default 'imperial' units (fahrenheit) from config file.
function getUnits(units)
{
	if (!units || units === 'fahrenheit') return (config.units)
	return("metric")
}

function getWeather() {
	
	// clear page
	manageDOM.clearContent("weather");

	// getting data from config
	var currentWeather = config.currentWeather;

	// array of elements for builing new html
	var elements = [
		'w_location', 'w_img_wrap', 'w_cur_temp', 'w_conditions'
	];
	
	// creating new html
	manageDOM.array2Div(elements, "weather");

    var w_icon = document.createElement("img");
	w_icon.id = "wicon";
	
	// check input for units
	var units = getUnits(document.getElementById('units_form').checked);
	var deg = units === "metric" ? "C" : "F";

	document.getElementById('weather_wrapper').className = "center_center";
	document.getElementById('w_img_wrap').appendChild(w_icon);
	
	// making url for request to weather api
	var weatherAPI = 
	config.openWeatherMapAPI + 'weather?q=' +
	config.location + '&units=' + config.units + '&APPID=' + currentWeather.appKey;

	// request to the API and filling html
	getJSON(weatherAPI, function(err, data){
		if (err) throw err;
		else {
			var weather = data.weather[0];
			var icon = weather.icon;
			w_icon.setAttribute("src", "http://openweathermap.org/img/w/" + icon + ".png");
			document.getElementById("w_cur_temp").innerHTML = Math.floor(data.main.temp) + "\
											&deg" + deg;
			document.getElementById("w_conditions").innerHTML = weather.main;
			document.getElementById("w_location").innerHTML = data.name;
	
		}
	});
}

function getWeatherAtLocation() {
	
	// check input for location
	var place = getLocation(document.getElementById('location_form').value)

	// check input for units
	var units = getUnits(document.getElementById('units_form').checked)
	
	// clear page
	manageDOM.clearContent("content");

	// getting data from config
	var currentWeather = config.currentWeather;

	// array of elements for builing new html
	var elements = [
		'wl_location', 'wl_img_wrap', 'wl_cur_temp', 'wl_conditions'
	];
	
	// creating new html
	manageDOM.array2Div(elements, "content");

    var wl_icon = document.createElement("img");
	wl_icon.id = "wlicon";
	
	// check input for units
	var units = getUnits(document.getElementById('units_form').checked);
	var deg = units === "metric" ? "C" : "F";

	document.getElementById('wl_img_wrap').appendChild(wl_icon);
	document.getElementById('content_wrapper').className = "weather_location";
	
	// making url for request to weather api
	var weatherAPI = 
	config.openWeatherMapAPI + 'weather?q=' +
	place + '&units=' + units + '&APPID=' + currentWeather.appKey;

	// request to the API and filling html
	getJSON(weatherAPI, function(err, data){
		if (err) throw err;
		else {
			var weather = data.weather[0];
			var icon = weather.icon;
			wl_icon.setAttribute("src", "http://openweathermap.org/img/w/" + icon + ".png");
			document.getElementById("wl_cur_temp").innerHTML = Math.floor(data.main.temp) + "\
																&deg" + deg;
			document.getElementById("wl_conditions").innerHTML = weather.main;
			document.getElementById("wl_location").innerHTML = data.name;
	
		}
	});
}