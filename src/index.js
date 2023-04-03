import "./style.css";

async function getTemp(location) {
  const response = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=1d5ac9b455ba4080b0305542233103&q=" +
      location,
    { mode: "cors" }
  );
  const data = await response.json();
  return {
    data: data,
    condition: data.current.condition.text,
    icon: data.current.condition.icon,
    temperatureF: data.current.temp_f,
    temperatureC: data.current.temp_c,
    name: data.location.name,
    region: data.location.region,
  };
}

const input = document.getElementById("input");
const submit = document.getElementById("submit");
const location = document.getElementById("location");
const condition = document.getElementById("condition");
const temperature = document.getElementById("temperature");
const iconImg = document.getElementById("icon");

location.textContent = "Hogsmeade";
condition.textContent = "Light snow";
temperature.textContent = "25 F";
iconImg.src = "//cdn.weatherapi.com/weather/64x64/night/113.png";

const C = document.getElementById("c");
const F = document.getElementById("f");
F.classList.add("active");
let fahrenheit = true;

C.addEventListener("click", function () {
  C.classList.add("active");
  F.classList.remove("active");
  fahrenheit = false;
});
F.addEventListener("click", function () {
  F.classList.add("active");
  C.classList.remove("active");
  fahrenheit = true;
});

submit.addEventListener("click", async function () {
  let data = await getTemp(input.value);
  location.textContent = data.name + ", " + data.region;
  iconImg.src = data.icon;
  condition.textContent = data.condition;
  if (fahrenheit === true) {
    temperature.textContent = data.temperatureF + "F";
  } else {
    temperature.textContent = data.temperatureC + "C";
  }
  console.log(data.icon);
  input.value = "";
});

window.addEventListener("keydown", async function () {
  if (event.keyCode === 13) {
    let data = await getTemp(input.value);
    location.textContent = data.name + ", " + data.region;
    condition.textContent = data.condition;
    if (fahrenheit === true) {
      temperature.textContent = data.temperatureF + "F";
    } else {
      temperature.textContent = data.temperatureC + "C";
    }

    input.value = "";
  }
});
