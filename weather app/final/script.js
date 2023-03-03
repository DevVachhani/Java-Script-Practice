"use strict";

const btnCehckMyweather = document.getElementById("Weather");
const locationGet = document.getElementById("location");
const labelDate = document.querySelector(".date");
const containerMovements = document.querySelector(".movements");
const labelTemp = document.querySelector(".temprature");
const Wicon = document.querySelector(".icon");

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // console.log(position);
    },
    function () {
      alert("could not get your position");
    }
  );

// city.inserAdjectHTML("location");

const request = new XMLHttpRequest();
request.open("GET", "https://countriesnow.space/api/v0.1/countries");
request.send();

request.addEventListener("load", function () {
  const data = JSON.parse(this.responseText);
  // console.log(data.data[96]);
  // console.log(data.data[96].cities);
  // const c = Array.from(data.data);
  // console.log(c);

  // c.map((el) => {
  //   document
  //     .getElementById("country")
  //     .insertAdjacentHTML("beforeend", `<option value="${el}">${el}</option>`);

  const q = Array.from(data.data[96].cities);
  // const c = Array.from(data);
  // c.map((ec) => {
  //   document
  //     .getElementById("country")
  //     .insertAdjacentHTML("beforeend", `<option value="${ec}">${ec}</option>`);
  q.map((e) => {
    document
      .getElementById("location")
      .insertAdjacentHTML("beforeend", `<option value="${e}">${e}</option>`);
    // console.log();
  });
});

var x;
var weather;
var iconcode;
document.getElementById("location").addEventListener("change", function (e) {
  // console.log(e.target.value);
  x = e.target.value;

  btnCehckMyweather.addEventListener("click", function () {
    console.log(x);

    var url = `https://api.openweathermap.org/data/2.5/weather?q=${x}&units=metric&appid=9a2ecb08a03c4efc56a4050642bd1279`;
    const requestWeather1 = new XMLHttpRequest();
    requestWeather1.open("GET", url);
    requestWeather1.send();
    requestWeather1.addEventListener("load", function () {
      const currWeather = JSON.parse(this.responseText);
      console.log(currWeather);
      // console.log(currWeather.weather[0].icon);

      weather = currWeather.main.temp;

      console.log(weather);

      labelTemp.innerHTML = `${weather} .C`;

      iconcode = currWeather.weather[0].icon;

      //  icon
      // console.log(`http://openweathermap.org/img/wn/${iconcode}.png`);
      // var urls = `http://openweathermap.org/img/wn/${iconcode}.png`;
      // const requesturl = new XMLHttpRequest();
      // requesturl.open("GET", urls);
      // requesturl.send();
      // console.log(document.querySelector(".temprature"));
      const vx = `<div id="icon" class="icon"><img id="w-icon" src=${`http://openweathermap.org/img/wn/${iconcode}.png`} alt="Weather icon" /></div>`;
      // const v = `<img id="w-icon" src=${`http://openweathermap.org/img/wn/${iconcode}.png`} alt="Weather icon" />`;
      document
        .querySelector(".temprature")
        .insertAdjacentHTML("afterbegin", vx);
      // document.getElementById(
      //   "w-icon"
      // ).src = `http://openweathermap.org/img/wn/${iconcode}.png`;
      // requesturl.addEventListener("load", function () {
      //   console.log(iconcode);
    });
  });
});

const displayDate = new Date();

labelDate.insertAdjacentHTML("afterbegin", displayDate);
// console.log(displayDate);

// const hours = displayDate.getHours();
// console.log(hours);
