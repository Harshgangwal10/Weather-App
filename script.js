const cityInput =document.querySelector('.search-city');
const serachBtn= document.querySelector('.search-btn')

const weatherInfo =document.querySelector('.weather-details')
const notfoundCity =document.querySelector('.not-found ');
 const serachCity = document.querySelector('.serach-area')

 const countrytext =document.querySelector('.country-name')
 const tempText= document.querySelector('.temp-text')
const currentDate =document.querySelector('.current-date')
const condtiontext =document.querySelector('.condition-text')
const humidityValue =document.querySelector('.humidity-value')
const windvalue =document.querySelector('.wind-speed')
const weatherImg =document.querySelector('.img')


const apiKey ="Api_key";


serachBtn.addEventListener('click' ,() =>{
  if(cityInput.value.trim() !=''){
    updateWeatherInfo(cityInput.value);
    cityInput.value=''
    cityInput.blur()
  }
 
})

cityInput.addEventListener('keydown',(event)=>{
  if(event.key=='Enter' && cityInput.value.trim() !=''){
   updateWeatherInfo(cityInput.value);
    cityInput.value=''
    cityInput.blur()
  }
})

 async function getFetchData(endpoint,city){
  const apiUrl=`https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${apiKey}&units=metric`

  const response = await fetch(apiUrl);
  return response.json()
}


async function updateWeatherInfo(city){

  const weatherData = await getFetchData('weather',city);
  if(weatherData.cod != 200){
    showDispalySection(notfoundCity);
    return
  }
  
  const { 
    name: country,
    main:{temp,humidity},
    weather:[{id,main}],
    wind:{speed}

  } =weatherData

  countrytext.textContent =country
  tempText.textContent= Math.round(temp)+ ' °C'
  condtiontext.textContent =main
  humidityValue.textContent = humidity +' %'
  windvalue.textContent = speed + 'M/s'
  
currentDate.textContent =getCurrentDate()
 showDispalySection(weatherInfo)
 showWeatherAnimation(id);
}

 function getCurrentDate(){
  const currentDate =new Date()
  const options ={
    weekday:'short',
    day:'2-digit',
    month:'short'
  }
  return currentDate.toLocaleDateString('en-Gb' ,options)
 }

function showDispalySection(section){
  [weatherInfo,serachCity,notfoundCity].forEach(section => section.style.display= 'none')

  section.style.display ='flex'
}


function showWeatherAnimation(id) {
  const canvases = document.querySelectorAll('.weatherCanvas');
  if (!canvases) {
    console.error("Canvas element not found!");
    return;
}
  canvases.forEach(canvas => canvas.style.display = 'none');

  if (id >= 200 && id <= 232) {
      drawRain("rainCanvas");
      document.getElementById("rainCanvas").style.display = "block";
  } else if (id >= 300 && id <= 531) {
      drawRain("rainCanvas");
      document.getElementById("rainCanvas").style.display = "block";
  } else if (id >= 600 && id <= 622) {
      drawSnow("snowCanvas");
      document.getElementById("snowCanvas").style.display = "block";
  } else if (id >= 701 && id <= 781) {
      drawWindy("windCanvas");
      document.getElementById("windCanvas").style.display = "block";
  } else if (id >= 800) {
      drawSunny("sunnyCanvas");
      document.getElementById("sunnyCanvas").style.display = "block";
  } 

}


function drawSunny(sunnyCanvas) {
  const canvas = document.getElementById(sunnyCanvas);
  const ctx = canvas.getContext("2d");
  let angle = 0;

  const sunX = 50;  
  const sunY = 45;  
  const sunRadius = 25; 
  const innerRay = sunRadius + 5; 
  const outerRay = sunRadius + 15;  

  function animateSun() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

     
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      ctx.fillStyle = "yellow";
      ctx.fill();
      ctx.closePath();

      
      for (let i = 0; i < 12; i++) { 
          let rayAngle = angle + (i * Math.PI / 6); 
          let x1 = sunX + Math.cos(rayAngle) * innerRay; 
          let y1 = sunY + Math.sin(rayAngle) * innerRay;
          let x2 = sunX + Math.cos(rayAngle) * outerRay;
          let y2 = sunY + Math.sin(rayAngle) * outerRay;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = "orange";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.closePath();
      }

      angle += 0.01; 
      requestAnimationFrame(animateSun);
  }

  animateSun();
}

function drawCloudSun(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  let sunX = 40;

  function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

     
      ctx.beginPath();
      ctx.arc(sunX, 50, 30, 0, Math.PI * 2);
      ctx.fillStyle = "yellow";
      ctx.fill();
      ctx.closePath();

      
      ctx.beginPath();
      ctx.arc(70, 60, 25, 0, Math.PI * 2);
      ctx.arc(90, 50, 30, 0, Math.PI * 2);
      ctx.arc(110, 60, 25, 0, Math.PI * 2);
      ctx.fillStyle = "lightgray";
      ctx.fill();
      ctx.closePath();

      sunX += 0.5;
      if (sunX > 100) sunX = 40; 

      requestAnimationFrame(animate);
  }

  animate();
}

function drawRain(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  let raindrops = [];

  function createRaindrops() {
      for (let i = 0; i < 20; i++) {
          raindrops.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, speed: Math.random() * 4 + 2 });
      }
  }

  function animateRain() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "blue";

      raindrops.forEach(drop => {
          ctx.beginPath();
          ctx.arc(drop.x, drop.y, 2, 0, Math.PI * 2);
          ctx.fill();
          drop.y += drop.speed;
          if (drop.y > canvas.height) drop.y = 0;
      });

      requestAnimationFrame(animateRain);
  }

  createRaindrops();
  animateRain();
}

function drawWindy(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  let cloudX = 0;

  function animateWind() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw cloud
      ctx.beginPath();
      ctx.arc(cloudX + 50, 60, 20, 0, Math.PI * 2);
      ctx.arc(cloudX + 70, 50, 30, 0, Math.PI * 2);
      ctx.arc(cloudX + 90, 60, 20, 0, Math.PI * 2);
      ctx.fillStyle = "gray";
      ctx.fill();
      ctx.closePath();

      cloudX += 1;
      if (cloudX > canvas.width) cloudX = -100; // 

      requestAnimationFrame(animateWind);
  }

  animateWind();
}

function drawSnow(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  let snowflakes = [];

  function createSnowflakes() {
      for (let i = 0; i < 20; i++) {
          snowflakes.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, speed: Math.random() * 2 + 1 });
      }
  }

  function animateSnow() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";

      snowflakes.forEach(flake => {
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, 3, 0, Math.PI * 2);
          ctx.fill();
          flake.y += flake.speed;
          if (flake.y > canvas.height) flake.y = 0;
      });

      requestAnimationFrame(animateSnow);
  }
  createSnowflakes();
  animateSnow();
}

