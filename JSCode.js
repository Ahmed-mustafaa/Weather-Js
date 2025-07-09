// awl haga select el section 34an t manipulate tel background
const apiKey = 'ed18d7d7a0869d03fbfb2f82a7db155b'
const animationContainer = document.getElementById('weatherAnimation');
const h1 = document.querySelector('.weather-section');
let currentAnimation = null;
const WindowBackground= document.querySelector('.window-background');
const BodyWall = document.querySelector('.body');
const searchInput = document.getElementById("searchInput")

const Button = document.getElementById("submit")

const countryName = document.getElementById("country");
const city = document.getElementById("city");
const Temp = document.getElementById("temp");
const condition = document.getElementById("weather-condition");

Button.addEventListener('click',function(e){
e.preventDefault()
Search();
})
// function to fetch el country
// getting user's current location
const getGeoLocation = function() {
  return new Promise((resolve, reject) => { 
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            resolve({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            })
        }, error=>
        {
            console.error('Error getting geolocation:', error);
            reject(error);
        })
    }
});
}

getGeoLocation().then(loc => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&appid=${apiKey}&units=metric`)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error('Weather data not found');
    }).catch(error => {
        console.error('Error fetching weather:', error);
        return Promise.reject(error);
    });
    //const location = getGeoLocation();
}).then(data => { console.log(data);

            countryName.textContent = data.sys['country']
            city.textContent = data.name
            Temp.textContent = `${(data.main['temp']).toFixed(1)}°C`
            condition.textContent = data.weather[0]['description']
        

  // Display the weather description in the h1 element

//   getWeather(data[0]).then(weatherData => {
//     console.log(weatherData.weather[0].description);
//     h1.textContent = `Weather in ${data[0].name.common}: ${weatherData.weather[0].description}`;
//     changeBackground(weatherData.weather[0].description);
//     fetchCountryImage(data.sys['country']).then(() => {
//         console.log(`Background image set for ${data[0].name.common}`);
//     }).catch(error => {
//         console.error(`Error setting background image for ${data[0].name.common}:`, error);
//     });
//   }).catch(error => {
//     console.error('Error fetching country img data:', error);   
//   });
 })
const Search =  async function(){

const query = searchInput.value.trim();
if(!query) return // guard clause 
  searchInput.value = "";
try{

const countryData = await fetchCountry(query);
const lat = countryData[0].latlng[0];
const lon = countryData[0].latlng[1];
const weatherData = await getWeather(lat,lon);
const weather =weatherData.weather[0].description
SettingCountryData(query,weatherData.name,weatherData.main['temp'],weather)
console.log(` From search ${query}:${weather}`);
console.log(weatherData)
}
catch(err){
console.error('Error searching for your input country:', err)
}

}
console.log(`its ${Search()} is is is `)
// fetching specific country ( elly rag3a mn search )
const fetchCountry = function(country){
 return fetch((`https://restcountries.com/v3.1/name/${country}`))
 .then(response=>{
    if(response.ok){
        return response.json();
    }
    throw new Error('Country not found');
}).catch(error => {
    console.error('Error fetching country:', error);
    return Promise.reject(error);
});

};



// function to fetch el weather by countryname 
const getWeather= function(lat,lng){ 
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`)
  .then(response => {
    if(response.ok){
        return response.json();
    }
    throw new Error('Weather data not found');
  }).catch(error => {
    console.error('Error fetching weather:', error);
    return Promise.reject(error);
  });
}
// getting user location 


// a function to change background based on weather condition
const changeBackground = function(weatherState) {
    switch (weatherState) {
        case 'clear sky':
            weatherBackground.src = 'https://videocdn.cdnpk.net/joy/content/video/free/2013-06/large_preview/BlueSkyTimelapsewithClouds_1.mp4?token=exp=1751579261~acl=/*~hmac=05d3916ab92d87811e772a145b90df64134d37b81b26726d53c247405b55b3fd';
            break;
        case 'Clouds':
            weatherBackground.src = 'https://videocdn.cdnpk.net/videos/036b54ac-1e90-5aa0-b04a-cf8200b16d26/horizontal/previews/clear/large.mp4?token=exp=1751579627~hmac=d848aa8fe7fcb9e535d4ea2042fe1c73343274ed8ee52eb48587cf8797d9ab20'; // sunny
            break;
        case 'Rain':
            weatherBackground.src = 'https://videocdn.cdnpk.net/videos/5035ff2d-2126-5ecb-9a42-1ff490e32b4a/horizontal/previews/clear/large.mp4?token=exp=1751578826~hmac=2ebe9bf6598f17c7fef9cb721a4b15b75aaca4c902ea58d986b0d40858244aaf'; // sunny
            break;
        case 'Snow':
            weatherBackground.src = 'https://videocdn.cdnpk.net/videos/5035ff2d-2126-5ecb-9a42-1ff490e32b4a/horizontal/previews/clear/large.mp4?token=exp=1751578826~hmac=2ebe9bf6598f17c7fef9cb721a4b15b75aaca4c902ea58d986b0d40858244aaf'; // snowy
            break;
        case 'broken clouds':
            weatherBackground.src ='https://videocdn.cdnpk.net/videos/7ed77864-89f5-53b7-a6f7-ac41d94e79de/horizontal/previews/clear/large.mp4?token=exp=1751580588~hmac=d6be68aeb2e472e35559c3d2d7c0d23049bdcc142b903173e0265f61de4096f6';
            break;
            case 'sunny':
            weatherBackground.src = 'https://videocdn.cdnpk.net/videos/6041161f-a82a-5e63-acf4-105e6d8005ba/horizontal/previews/clear/large.mp4?token=exp=1751579271~hmac=e4132163a1b620ed45ef9e9c99fed73e60b9a52f55437cc3d7efe5361d807603'; // sunny
        default:
            weatherBackground.src = 'https://videocdn.cdnpk.net/videos/5035ff2d-2126-5ecb-9a42-1ff490e32b4a/horizontal/previews/clear/large.mp4?token=exp=1751578826~hmac=2ebe9bf6598f17c7fef9cb721a4b15b75aaca4c902ea58d986b0d40858244aaf'; // sunny
    }
     
};
const arr = ['brazil', 'egypt', 'france', 'germany', 'italy', 'japan', 'spain', 'united states'];
let index = 0;

function showCountryWeather() {
    const country = arr[index];
    fetchCountry(country).then(data => {
        getWeather(data[0]).then(weatherData => {
            const weatherState = weatherData.weather[0].description;
            changeBackground(weatherState);
            h1.textContent = `Weather in ${data[0].name.common}: ${weatherState}`;
        }).catch(error => {
            console.error(`Error fetching weather for ${country}:`, error);
        });
    });

    index++;
    if (index >= arr.length) index = 0; // Loop back to start
}
// showCountryWeather();
// setInterval(showCountryWeather, 2000); // every 2 seconds


async function fetchCountryImage(country) {
    const unsplashKey = 'MARVRHG3YjDgT2Y_1WH8M5tE6FMe-TLatyRcWcWaheg';
    const countryFetch  = await fetch(`https://api.unsplash.com/search/photos?query=${country}&client_id=${unsplashKey}`);
    const result = await countryFetch.json();
        const imageUrl = result.results[0]?.urls?.regular;
// if (imageUrl) {
//         BodyWall.style.backgroundImage = `url('${imageUrl}')`;
//         BodyWall.style.backgroundSize = "cover";
//         BodyWall.style.backgroundPosition = "center";
//         BodyWall.style.backgroundRepeat = "no-repeat";
//     } else {
//         // fallback color if no image found
//         document.body.style.backgroundImage = "";
//         document.body.style.backgroundColor = "#e8b4b4";
//     }  console.log(result);
// /
 }

//fetchCountryImage('Egypt')

// implementing search function 

// searchInput.addEventListener('keypress', function(event) {
//     if (event.key === 'Enter') {
//         event.preventDefault();
//         const country = searchInput.value.trim();
//         if (country) {
//             fetchCountryImage(country);
//         }
//     }
// });


const SettingCountryData = function(country,name,tempreature,desc){
      countryName.textContent = country
            city.textContent = name
            Temp.textContent = tempreature
            condition.textContent = desc
}