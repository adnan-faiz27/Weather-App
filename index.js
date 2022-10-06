let lat;
let long;
let xyValues1;
let xyValues2;
let xyValues3;
let xyValues4;
let rainarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let temparr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let rharr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let snowarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const date = document.getElementById(`date`);
const icon = document.getElementById(`icon`);
const output = document.getElementById(`output`);
const components = document.getElementsByClassName(`components`);
const form = document.getElementById(`form`);
const city = document.getElementById(`cityname`);
const Maindiv = document.getElementById(`Maindiv`);
const cityName = document.getElementById(`city`);
const page = document.getElementById(`page`);
const rh = document.getElementById(`rh`);
const Curr_date = document.getElementById(`Curr_date`);
const maxwind = document.getElementById(`windspeed_max`);
const snow = document.getElementById(`snow`);
const temp_min = document.getElementById(`temperature_min`);
const temp_max = document.getElementById(`temperature_max`);
const temp_change = document.getElementById(`temperature_change`);
const rain = document.getElementById(`rain`);
let error = `You have exceeded the DAILY quota for Requests on your current plan, BASIC.`;
let i = 0;
let forecast;
let name = `Delhi`;
function display() {
  let currdate = forecast[0].valid_date;
  let change;
  if (i == 0) {
    change = 0;
  } else {
    change = forecast[i].max_temp - forecast[i - 1].max_temp;
    change = ~~change + 1;
  }
  Curr_date.innerHTML = `Current Date: ${currdate}`;
  rh.innerHTML = `Releative Humidity: ${forecast[i].rh}`;
  date.innerHTML = `Date: ${forecast[i].valid_date}`;
  maxwind.innerHTML = `Max WindSpeed: ${forecast[i].wind_spd} km/hr`;
  snow.innerHTML = `Snow: ${forecast[i].snow}`;
  temp_min.innerHTML = `Min Temperature: ${forecast[i].min_temp} C`;
  temp_max.innerHTML = `Max Temperature: ${forecast[i].max_temp} C`;
  rain.innerHTML = `Rain Probablity: ${forecast[i].pop}%`;
  temp_change.innerHTML = `Change in temp: ${change} C`;
}
function showicon() {
  if (
    forecast[i].weather.description == "Thunderstorm with heavy rain" ||
    forecast[i].weather.description == "Storm" ||
    forecast[i].weather.description == "Heavy Storm"
  ) {
    icon.innerHTML = `<i class="uil uil-thunderstorm"></i>`;
  }else if (
  forecast[i].weather.description == "Light rain" ||
  forecast[i].weather.description == "Mix snow/rain"||
  (forecast[i].pop<40 && forecast[i].pop>25))
  {
    icon.innerHTML = `<i class="uil uil-cloud-drizzle"></i>`;
  } else if (
    forecast[i].weather.description == "Moderate rain" ||
    forecast[i].weather.description == "Light shower rain"||
    (forecast[i].pop>55 && forecast[i].pop<70)
  ) {
    icon.innerHTML = `<i class="uil uil-cloud-showers"></i>`;
  }else if (
    forecast[i].weather.description == "Snow" ||
    forecast[i].weather.description == "Light Snow" ||
    forecast[i].weather.description == "Moderate Snow" ||
    forecast[i].weather.description == "Heavy Snow"||
    forecast[i].snow>5
  ){
    icon.innerHTML = `<i class="uil uil-cloud-meatball"></i>`;
  }else if (forecast[i].weather.description == "Heavy rain"||forecast[i].pop>80) {
    icon.innerHTML = `<i class="uil uil-cloud-showers-alt"></i>`;
  } else if (
    forecast[i].weather.description == "Few clouds" ||
    forecast[i].weather.description == "Scattered clouds" ||
    forecast[i].weather.description == "Scattered clouds" ||
    forecast[i].weather.description == "Overcast clouds" ||
    forecast[i].weather.description == "Broken clouds"
  ) {
    icon.innerHTML = `<i class="uil uil-clouds"></i>`;
  }else if (forecast[i].weather.description == "Clear Sky") {
    icon.innerHTML = `<i class="uil uil-cloud-sun"></i>`;
  }else {
    icon.innerHTML = `<i class="uil uil-cloud"></i>`;
  }
}
let max;
function showcharts() {
  for (let i = 0; i < 14; i++) {
    rainarr[i] = forecast[i].pop;
    temparr[i] = forecast[i].max_temp;
    rharr[i] = forecast[i].rh;
    snowarr[i] = forecast[i].snow_depth;
    max = Math.max(...snowarr);
  }
    if(max>100)
    {
      max=1.5*max;
      max=Math.floor(max/100);
      max = max*100;
    }
    else{
      max = 100;
    }
}
function dispchart() {
  xyValues2 = [
    { x: 1, y: rainarr[0] },
    { x: 2, y: rainarr[1] },
    { x: 3, y: rainarr[2] },
    { x: 4, y: rainarr[3] },
    { x: 5, y: rainarr[4] },
    { x: 6, y: rainarr[5] },
    { x: 7, y: rainarr[6] },
    { x: 8, y: rainarr[7] },
    { x: 9, y: rainarr[8] },
    { x: 10, y: rainarr[9] },
    { x: 11, y: rainarr[10] },
    { x: 12, y: rainarr[11] },
    { x: 13, y: rainarr[12] },
    { x: 14, y: rainarr[13] },
  ];
  xyValues1 = [
    { x: 1, y: temparr[0] },
    { x: 2, y: temparr[1] },
    { x: 3, y: temparr[2] },
    { x: 4, y: temparr[3] },
    { x: 5, y: temparr[4] },
    { x: 6, y: temparr[5] },
    { x: 7, y: temparr[6] },
    { x: 8, y: temparr[7] },
    { x: 9, y: temparr[8] },
    { x: 10, y: temparr[9] },
    { x: 11, y: temparr[10] },
    { x: 12, y: temparr[11] },
    { x: 13, y: temparr[12] },
    { x: 14, y: temparr[13] },
  ];
  xyValues3 = [
    { x: 1, y: snowarr[0] },
    { x: 2, y: snowarr[1] },
    { x: 3, y: snowarr[2] },
    { x: 4, y: snowarr[3] },
    { x: 5, y: snowarr[4] },
    { x: 6, y: snowarr[5] },
    { x: 7, y: snowarr[6] },
    { x: 8, y: snowarr[7] },
    { x: 9, y: snowarr[8] },
    { x: 10, y: snowarr[9] },
    { x: 11, y: snowarr[10] },
    { x: 12, y: snowarr[11] },
    { x: 13, y: snowarr[12] },
    { x: 14, y: snowarr[13] },
  ];
  xyValues4 = [
    { x: 1, y: rharr[0] },
    { x: 2, y: rharr[1] },
    { x: 3, y: rharr[2] },
    { x: 4, y: rharr[3] },
    { x: 5, y: rharr[4] },
    { x: 6, y: rharr[5] },
    { x: 7, y: rharr[6] },
    { x: 8, y: rharr[7] },
    { x: 9, y: rharr[8] },
    { x: 10, y: rharr[9] },
    { x: 11, y: rharr[10] },
    { x: 12, y: rharr[11] },
    { x: 13, y: rharr[12] },
    { x: 14, y: rharr[13] },
  ];
  new Chart("RainChart", {
    type: "scatter",
    data: {
      datasets: [
        {
          pointRadius: 4,
          pointBackgroundColor: "rgb(0,0,255)",
          data: xyValues2,
        },
      ],
    },
    options: {
      legend: { display: false },
      scales: {
        xAxes: [{ ticks: { min: 0, max: 14 } }],
        yAxes: [{ ticks: { min: 0, max: 100 } }],
      },
    },
  });
  new Chart("tempChart", {
    type: "scatter",
    data: {
      datasets: [
        {
          pointRadius: 4,
          pointBackgroundColor: "rgb(0,0,255)",
          data: xyValues1,
        },
      ],
    },
    options: {
      legend: { display: false },
      scales: {
        xAxes: [{ ticks: { min: 0, max: 14 } }],
        yAxes: [{ ticks: { min: -20, max: 50 } }],
      },
    },
  });
  new Chart("SnowChart", {
    type: "scatter",
    data: {
      datasets: [
        {
          pointRadius: 4,
          pointBackgroundColor: "rgb(0,0,255)",
          data: xyValues3,
        },
      ],
    },
    options: {
      legend: { display: false },
      scales: {
        xAxes: [{ ticks: { min: 0, max: 14 } }],
        yAxes: [{ ticks: { min: 0, max: max } }],
      },
    },
  });
  new Chart("rhChart", {
    type: "scatter",
    data: {
      datasets: [
        {
          pointRadius: 4,
          pointBackgroundColor: "rgb(0,0,255)",
          data: xyValues4,
        },
      ],
    },
    options: {
      legend: { display: false },
      scales: {
        xAxes: [{ ticks: { min: 0, max: 14 } }],
        yAxes: [{ ticks: { min: 0, max: 100 } }],
      },
    },
  });
}

function nextorprev(a) {
  if (i == 0 && a == -1) {
    page.innerText = `Page: 1`;
    i = 0;
  } else if (i == 13 && a == 1) {
    i = 13;
    page.innerText = `Page: 14`;
  } else if (a == 1) {
    i = i + 1;
    page.innerText = `Page: ${i + 1}`;
  } else {
    i = i - 1;
    page.innerText = `Page: ${i + 1}`;
  }
  display();
  showicon();
}
async function getforecast(lat, long) {
  const resp = await fetch(
    `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lat=${lat}&lon=${long}`,
    options
  );
  const respData = await resp.json();

  if (respData == undefined) {
    getforecast(28.6139, 77.2090);
  } else if (respData.message) {
    output.innerHTML = `<div><br> You have exceeded the DAILY quota for Requests<br>Try again in 24hrs</div>`;
    output.style.height = `3.5rem`;
    output.style.fontSize = `0.75rem`;
    output.style.textAlign = `center`;
    output.style.color = `white`;
    Maindiv.style.height = `190vh`;
  } else {
    i=0;
    page.innerText = `Page: 1`;
    rainarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    temparr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    rharr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    snowarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    cityName.innerHTML = `City: ${respData.city_name}`;
    forecast = respData.data;
    dispchart();
    display();
    showicon();
    showcharts();
  }
}
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a1bceba3b9msh3accda498be30adp1867fejsn9fc9632ba986",
    "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
  },
};
const options1 = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a1bceba3b9msh3accda498be30adp1867fejsn9fc9632ba986",
    "X-RapidAPI-Host": "spott.p.rapidapi.com",
  },
};
async function getlatlong(name) {
  const resp = await fetch(
    `https://spott.p.rapidapi.com/places?type=CITY&skip=0&limit=10&q=${name}`,
    options1
  );
  const respData = await resp.json();
  if (respData.length == 0) {
    cityName.innerHTML = "City: Try another city";
    Curr_date.innerHTML = `Current Date: `;
    rh.innerHTML = `Releative Humidity: `;
    date.innerHTML = `Date: `;
    maxwind.innerHTML = `Max WindSpeed: `;
    snow.innerHTML = `Snow: `;
    temp_min.innerHTML = `Min Temperature: `;
    temp_max.innerHTML = `Max Temperature: `;
    rain.innerHTML = `Rain Probablity: `;
    temp_change.innerHTML = `Change in temp: `;
    rainarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    temparr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    rharr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    snowarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    dispchart();
  } else if (respData.message) {
    output.innerHTML = `<div><br> You have exceeded the MONTHLY quota for Requests</div>`;
    output.style.height = `3rem`;
    output.style.fontSize = `0.75rem`;
    output.style.color = `white`;
    Maindiv.style.height = `190vh`;
  } else {
    getforecast(
      respData[0].coordinates.latitude,
      respData[0].coordinates.longitude
    );
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = city.value;

  if (name) {
    getlatlong(name);
    city.value = "";
  }
});

const successCallback = (position) => {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  getforecast(lat, long);
};

const errorCallback = (error) => {
  getforecast(28.6139, 77.2090);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
dispchart();
