const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a1bceba3b9msh3accda498be30adp1867fejsn9fc9632ba986",
    "X-RapidAPI-Host": "forecast9.p.rapidapi.com",
  },
};
let lat;
let long;
let xyValues1;
let xyValues2;
let windarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let temparr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const date = document.getElementById(`date`);
const output = document.getElementById(`output`);
const components = document.getElementsByClassName(`components`);
const form = document.getElementById(`form`);
const city = document.getElementById(`cityname`);
const Maindiv = document.getElementById(`Maindiv`);
const cityName = document.getElementById(`city`);
const page = document.getElementById(`page`);
const Curr_time = document.getElementById(`Curr_time`);
const Curr_date = document.getElementById(`Curr_date`);
const maxwind = document.getElementById(`windspeed_max`);
const minwind = document.getElementById(`windspeed_min`);
const temp_min = document.getElementById(`temperature_min`);
const temp_max = document.getElementById(`temperature_max`);
const temp_change = document.getElementById(`temperature_change`);
const rain = document.getElementById(`rain`);
let error = `You have exceeded the DAILY quota for Requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/wettercom-wettercom-default/api/forecast9`;
let i = 0;
let forecast;
let name = `Delhi`;
function display() {
  let currdate = forecast.forecastDate.substr(0, 9);
  let currtime = forecast.forecastDate.substr(11);
  let change;
  if (i == 0) {
    change = 0;
  } else {
    change =
      forecast.items[i].temperature.max - forecast.items[i - 1].temperature.max;
  }
  Curr_date.innerHTML = `Current Date: ${currdate}`;
  Curr_time.innerHTML = `Current Date: ${currtime}`;
  date.innerHTML = `Date: ${forecast.items[i].date}`;
  maxwind.innerHTML = `Max WindSpeed: ${forecast.items[i].wind.max} km/hr`;
  minwind.innerHTML = `Min WindSpeed: ${forecast.items[i].wind.min} km/hr`;
  temp_min.innerHTML = `Min Temperature: ${forecast.items[i].temperature.min} C`;
  temp_max.innerHTML = `Max Temperature: ${forecast.items[i].temperature.max} C`;
  rain.innerHTML = `Rain Probablity: ${forecast.items[i].prec.probability}%`;
  temp_change.innerHTML = `Change in temp: ${change} C`;
}
function showcharts() {
  for (let i = 0; i < 14; i++) {
    windarr[i] = forecast.items[i].wind.max;
    temparr[i] = forecast.items[i].temperature.max;
  }
}
function dispchart() {
  xyValues2 = [
    { x: 1, y: windarr[0] },
    { x: 2, y: windarr[1] },
    { x: 3, y: windarr[2] },
    { x: 4, y: windarr[3] },
    { x: 5, y: windarr[4] },
    { x: 6, y: windarr[5] },
    { x: 7, y: windarr[6] },
    { x: 8, y: windarr[7] },
    { x: 9, y: windarr[8] },
    { x: 10, y: windarr[9] },
    { x: 11, y: windarr[10] },
    { x: 12, y: windarr[11] },
    { x: 13, y: windarr[12] },
    { x: 14, y: windarr[13] },
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
  new Chart("WindChart", {
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
        yAxes: [{ ticks: { min: 0, max: 20 } }],
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
}
async function getforecast(name) {
  const resp = await fetch(
    `https://forecast9.p.rapidapi.com/rapidapi/forecast/${name}/summary/`,
    options
  );
  const respData = await resp.json();

  if (respData.forecast == undefined && respData.message != error) {
    cityName.innerHTML = "City: Delhi";
    getforecast("Delhi");
  } else if (respData.message == error) {
    output.innerHTML = `<div><br> You have exceeded the DAILY quota for Requests</div>`;
    output.style.height = `3rem`;
    output.style.fontSize = `0.75rem`;
    output.style.color = `white`;
    Maindiv.style.height = `130vh`;
  } else {
    cityName.innerHTML = `City: ${name}`;
    forecast = respData.forecast;
    display();
    showcharts();
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = city.value;

  if (name) {
    getforecast(name);
    city.value = "";
  }
});

const successCallback = (position) => {
  lat = position.coords.latitude;
  long = position.coords.longitude;

  fetch(
    `https://spott.p.rapidapi.com/places/autocomplete?limit=1&skip=0&country=US%2CCA%2CIN&latitude=${lat}&longitude=${long}&type=CITY`,
    options1
  )
    .then((response) => response.json())
    .then((response) => {
      getforecast(response[0].name);
    })
    .catch((err) => console.error(err));
};

const errorCallback = (error) => {
  console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

const options1 = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a1bceba3b9msh3accda498be30adp1867fejsn9fc9632ba986",
    "X-RapidAPI-Host": "spott.p.rapidapi.com",
  },
};
dispchart();
