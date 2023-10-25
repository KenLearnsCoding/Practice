// https://www.youtube.com/watch?v=WZNG8UomjSI (Link from tutorial)
// I have watched all from tutorial and understand really well. 

// Set this variable with the API call and functions in it to be easy to access from search bar.
// I think this is really cool to expand more accessibility to user when they could search anywhere in world (not earth's outsider).
let weather = {
  // apiKey will take role as a variable keeping the API key.
  apiKey: "f6f5db0d9753786d0cfa4d7eec60e8c2", //My API key.
  // This function format is high level, but i could understand it. 
  // fetWeather is the name of function. 
  // function is the name of library.
  // city is the parameter where the value is pushed ina.
  fetchWeather: function (city) {
    // This fetch method will load the data with new city and same API key, the fetch is also advance method which was not included in our class. 
    fetch(
      // city variable is for loading the input to the API link.
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    ) 
    // This function is really advanced for beginner like me, but i am getting familiar using it. 
      .then((response) => {
        // This code below will is like pop up a message if there is no data found from API.
        // My API key is not working now, because it has to generate the data with my API key. 
        // it could take like few hours. 
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      // This line of code is for call the the displayWeather function with data loading to the function. 
      .then((data) => this.displayWeather(data));
  },
  // This function names ""
  displayWeather: function (data) {
    // The {} is not that special, it is just about to put the variables in right of their orders,
    // if we type the variables in wrong position. 
    var { name } = data;
    var { icon, description } = data.weather[0];
    var { temp, humidity } = data.main;
    var { speed } = data.wind;
    // This section below is nothing special, just similar using like Jquery to get data and push the data to id call. 
    document.querySelector(".city").innerText = "Weather in " + name;
    // This is for icon. 
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";

    // Here is the code structure like your sample. 
    // I dont know when i use your code structure in here, the data cant be loaded in here. Can you explain to me? 
    // $(".city").html("weather in" + name);
    // $(".icon").html("https://openweathermap.org/img/wn/" + icon + ".png");
    // $(".description").html(description);
    // $(".temp").html(temp + "°C");
    // $(".humidity").html("Humidity: " + humidity + "%");
    // $(".wind").html("Wind speed: " + speed + " km/h");
    // // Can you pls help me with this line of code? I didnt know how to type it in jquery to remove the loading. 
    // // $("#weather").classList.remove(html("loading"));
    // document.querySelector(".weather").classList.remove("loading");
    // $("body").css("background-image","url('https://source.unsplash.com/1600x900/?" + name + "')");
  },
  
  // This  search function will get the value(Location name) from search bar and call fetchWeather function with the location name. 
  search: function () {
    // "this" represents for search function name. It is just a shortcut for pro-dev, but i like to use it for convenient. 
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

// This is just a button, whenever user click the button, this line of code will execute and call the search function 
// to start all the functions in this js file with the input. 
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

// Same thing, this is where user will type the location name, after user press enter key, 
// the input will send input input the search function and wake up all the functions in this js file. 
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

// This is just a function call for fetchWeather with "Denver" (first location) from variable weather. 
weather.fetchWeather("Denver");
