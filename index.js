const api = {
  key: "b1d629e131a24f2f39dacffd0a0544b9",
  baseurl: "https://api.openweathermap.org/data/2.5/"
}

let temperatureDescription = document.querySelector('.temperature-description')
let temperatureDegree = document.querySelector('.temperature-degree')
let temperatureLowMax = document.querySelector('.temperature-low-max')
let iconImg = document.querySelector('.degree-section img')
let now = new Date();
let date = document.querySelector('.location p')
let windValue = document.querySelector('.desails-item-wind')
let humidityValue = document.querySelector('.desails-item-humidity')
let celsius = document.querySelector('.celsius')
let farenheit = document.querySelector('.farenheit')
const searchbox = document.querySelector('.location h1 input');

function inputGrow() {
  searchbox.style.width = searchbox.value.length + 'px'

  searchbox.addEventListener('keypress', function () {
    this.style.width = this.value.length + 'px'
  })
  
  $('.location h1 input').inputAutogrow();
}

searchbox.addEventListener('keypress', setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchbox.value);
  }
}

fetch(`${api.baseurl}weather?q=London&units=metric&APPID=${api.key}`)
    .then(response => {
      return response.json();
    })
    .then(displayResults)
    .then(inputGrow)

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(response => {
      return response.json();
    })
    .then(displayResults)
    .then(inputGrow)
}

function displayResults(data) {
  console.log(data);
  const {humidity, temp, temp_max, temp_min} = data.main;
  // Set DOM Elements from the API 

  for (desc of data.weather) {
    const {description, icon} = desc
    console.log(icon);
    temperatureDescription.textContent = `${description}`

    iconImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
  }

  searchbox.value = data.name
  console.log(Math.round((temp * (9 / 5)) + 32));
  date.innerText = dateBuilder(now);
  windValue.innerText = `${Math.round(data.wind.speed)} km/h`
  humidityValue.innerText = `${Math.round(humidity)}%`

  // Change temperature to Celsius/Farenheit
  celsius.addEventListener('click', function(){
    celsius.classList.add('active')
    farenheit.classList.remove('active')
    temperatureDegree.innerHTML = `${Math.round(temp)}<span>°c</span>`
    temperatureLowMax.innerHTML = `${Math.round(temp_max)}° / ${Math.round(temp_min)}°`
  })

  farenheit.addEventListener('click', function(){
    farenheit.classList.add('active')
    celsius.classList.remove('active')
    temperatureDegree.innerHTML = `${Math.round((temp * (9 / 5)) + 32)}<span>°f</span>`
    temperatureLowMax.innerHTML = `${Math.round((temp_max * (9 / 5)) + 32)}° / ${Math.round((temp_min * (9 / 5)) + 32)}°`
  })

  if (celsius.classList.contains('active')) {
    temperatureDegree.innerHTML = `${Math.round(temp)}<span>°c</span>`
    temperatureLowMax.innerHTML = `${Math.round(temp_max)}° / ${Math.round(temp_min)}°`
  } else {
    temperatureDegree.innerHTML = `${Math.round((temp * (9 / 5)) + 32)}<span>°f</span>`
    temperatureLowMax.innerHTML = `${Math.round((temp_max * (9 / 5)) + 32)}° / ${Math.round((temp_min * (9 / 5)) + 32)}°`
  }
}

function dateBuilder(d){
  let months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}