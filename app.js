const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a1bceba3b9msh3accda498be30adp1867fejsn9fc9632ba986',
		'X-RapidAPI-Host': 'forecast9.p.rapidapi.com'
	}
};
const date = document.getElementById(`date`);
const output = document.getElementById(`output`);
const components = document.getElementsByClassName(`components`);
const form = document.getElementById(`form`);
const city = document.getElementById(`cityname`);
const cityName = document.getElementById(`city`);
const page = document.getElementById(`page`);
const Curr_time= document.getElementById(`Curr_time`);
const Curr_date= document.getElementById(`Curr_date`);
const maxwind= document.getElementById(`windspeed_max`);
const minwind= document.getElementById(`windspeed_min`);
const temp_min= document.getElementById(`temperature_min`);
const temp_max= document.getElementById(`temperature_max`);
const temp_change= document.getElementById(`temperature_change`);
const rain= document.getElementById(`rain`);
let error = `You have exceeded the DAILY quota for Requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/wettercom-wettercom-default/api/forecast9`;
let i =0;
let forecast;
let name = `Delhi`;
function display()
{
    let currdate = forecast.forecastDate.substr(0,9);
    let currtime = forecast.forecastDate.substr(11);
    let change ;
    if(i==0)
    {
        change=0;
    }
    else{
        change = forecast.items[i].temperature.max-forecast.items[i-1].temperature.max;
    }
    Curr_date.innerHTML = `Current Date: ${currdate}`
    Curr_time.innerHTML = `Current Date: ${currtime}`
    date.innerHTML = `Date: ${forecast.items[i].date}`
    maxwind.innerHTML = `Max WindSpeed: ${forecast.items[i].wind.max} km/hr`
    minwind.innerHTML = `Min WindSpeed: ${forecast.items[i].wind.min} km/hr`
    temp_min.innerHTML = `Min Temperature: ${forecast.items[i].temperature.min} C`
    temp_max.innerHTML = `Max Temperature: ${forecast.items[i].temperature.max} C`
    rain.innerHTML = `Rain Probablity: ${forecast.items[i].prec.probability}%`
    temp_change.innerHTML = `Change in temp: ${change} C`

}
function nextorprev(a){
    if(i==0 && a==-1)
    {
        page.innerText = `Page: 1`;
        i=0;
    }
    else if(i==13 && a==1)
    {   
        i=13;
        page.innerText = `Page: 14`;
    }
    else if(a==1)
    {
        i=i+1;
        page.innerText = `Page: ${i+1}`;
    }
    else{
        i=i-1
        page.innerText = `Page: ${i+1}`;
    }
    display();
}
async function getforecast(name) {
    const resp = await fetch(`https://forecast9.p.rapidapi.com/rapidapi/forecast/${name}/summary/`, options);
    const respData = await resp.json();

    if(respData.forecast==undefined && respData.message!=error)
    {
        cityName.innerHTML='City: Delhi';
        getforecast("delhi");
    }
    else if(respData.message==error)
    {
        output.innerHTML = `<div><br> You have exceeded the DAILY quota for Requests</div>`;
        output.style.height = `3rem`;
        output.style.fontSize = `0.9rem`;
	output.style.color = `white`;
    }
    else
    {
        cityName.innerHTML=`City: ${name}`
        forecast = respData.forecast;
        display();
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


let lat;
let long;
const successCallback = (position) => {
    lat = position.coords.latitude;
    long = position.coords.longitude;

    fetch(`https://spott.p.rapidapi.com/places/autocomplete?limit=1&skip=0&country=US%2CCA%2CIN&latitude=${lat}&longitude=${long}&type=CITY`, options1)
    .then(response => response.json())
    .then(response =>{
        getforecast(response[0].name);
    })
    .catch(err => console.error(err));
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };
  
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  const options1 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a1bceba3b9msh3accda498be30adp1867fejsn9fc9632ba986',
		'X-RapidAPI-Host': 'spott.p.rapidapi.com'
	}
};


