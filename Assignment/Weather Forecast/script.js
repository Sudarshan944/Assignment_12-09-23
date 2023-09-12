const apiKey = "b9bb38903b4490feb6d01206e3757348";
const weather = document.getElementById("out");
const fetchData = async () => {
  const cityName = document.getElementById("cntry").value; // Get the city name when the button is clicked
  if (cityName) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      const temperature = data.main.temp; // Temperature in Kelvin
      const weatherDescription = data.weather[0].description; // Description of weather
      const humidity = data.main.humidity; // Humidity percentage
      const windSpeed = data.wind.speed; // Wind speed in meters per second
      const country = data.sys.country; // Country code (e.g., "IN" for India)
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
      const iconImage = document.getElementById("weather-icon");
      iconImage.src = iconUrl;
      weather.innerHTML = `
      <p>Temperature : ${temperature}</p>
      <p>WeatherDescription : ${weatherDescription}</p>
      <p>Humidity : ${humidity}</p>
      <p>WindSpeed : ${windSpeed}</p>
      `;
      // Handle the weather data here
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error(error);
    }
  } else {
    alert("Please enter a city name");
  }
};

const searchButton = document.querySelector("button");
searchButton.addEventListener("click", () => {
  const cityName = document.getElementById("cntry").value; // Get the city name when the button is clicked
  if (cityName.trim() == "") {
    alert("Enter city name correctly");
    return;
  }
  weather.innerHTML = `<p>Loading...</p>`;
  fetchData(); // Call the fetchData function when the button is clicked
});
