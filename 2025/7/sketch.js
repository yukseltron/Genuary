let weatherData = null;

function fetchWeatherData(lat, lon) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      weatherData = {
        temperature: data.current_weather.temperature || 20,
        windSpeed: data.current_weather.windspeed || 5,
        humidity: data.hourly.relative_humidity_2m[0] || 50,
      };
      redraw();
    })
    .catch((err) => console.error('Error fetching weather data:', err));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeatherData(lat, lon);
    },
    (error) => {
      console.error('Error getting location:', error);
    }
  );
}

function draw() {
  if (!weatherData) {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text('Loading weather data...', width / 2, height / 2);
    return;
  }

  background(0);

  const { temperature, windSpeed, humidity } = weatherData;

  const tempColor = map(temperature, -10, 40, 0, 255);
  const windStrength = map(windSpeed, 0, 20, 1, 5);
  const humiditySize = map(humidity, 0, 100, 10, 200);

  strokeWeight(windStrength);
  stroke(tempColor, 100, 255 - tempColor, 150);
  for (let i = 0; i < 50; i++) {
    const x1 = random(width);
    const y1 = random(height);
    const x2 = x1 + random(-50, 50) * windStrength;
    const y2 = y1 + random(-50, 50) * windStrength;
    stroke(tempColor, 100, 255 - tempColor, 150);
    line(x1, y1, x2, y2);
  }

  noStroke();
  fill(100, 255, tempColor, 100);
  for (let i = 0; i < 30; i++) {
    const x = random(width);
    const y = random(height);
    const size = random(humiditySize * 0.5, humiditySize);
    fill(random(100, 255), 255 - tempColor, tempColor, 100);
    ellipse(x, y, size, size);
  }
}
