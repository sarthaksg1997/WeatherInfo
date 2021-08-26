const searchBtn = document.getElementById("searchBtn");
const searchcity = document.getElementById("searchcity");
const details = document.getElementById("details");
const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");
const city_name = document.getElementById("city_name");
const time = document.getElementById("time");

const getInfo = async (event) => {
  event.preventDefault();
  let cityValue = searchcity.value;
  if (cityValue === "") {
    details.innerHTML = '<h2>Please enter city name</h2>';
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=d5c0494660bc08f4ba27f7ff080e47a2`;
      const res = await fetch(url);
      const data = await res.json();
       console.log(data);

      temp.innerHTML = `${data.main.temp}&#8451;`;
      city_name.innerText = `${data.name},${data.sys.country}`;

      let seconds = data.dt;
      // Converting the seconds into time
      let date = new Date(seconds * 1000);
      // console.log(date);
      time.innerHTML = `${date.getHours()}:${date.getMinutes()}`;


      if (data.weather[0].main == "Clouds") {
        temp_status.innerHTML =
          '<i class="fas fa-cloud" style="color:rgba(4, 90, 248, 0.692);"></i>';
      } else if (data.weather[0].main == "Mist" || "Rain") {
        temp_status.innerHTML =
          '<i class="fas fa-cloud-rain" style="color:rgba(4, 90, 248, 0.692);"></i>';
      } else if (data.weather[0].main == "Sunny") {
        temp_status.innerHTML =
          '<i class="fas fa-cloud-sun" style="color:rgb(255, 218, 52);"></i>';
      } else {
        temp_status.innerHTML =
          '<i class="fas fa-cloud" style="color:rgba(4, 90, 248, 0.692);"></i>';
      }
    } catch {
      details.innerHTML = "<h2>Provide proper city name</h2>";
    }
  }
};

searchBtn.addEventListener("click", getInfo);
