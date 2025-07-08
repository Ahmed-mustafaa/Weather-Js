// awl haga select el section 34an t manipulate tel background
    const apiKey = 'ed18d7d7a0869d03fbfb2f82a7db155b'
const animationContainer = document.getElementById('weatherAnimation');
const h1 = document.querySelector('.weather-section');
let currentAnimation = null;
const WindowBackground
 = document.querySelector('.window-background');

// function to fetch el country

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
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`)
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
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&appid=${apiKey}`)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error('Weather data not found');
    }).catch(error => {
        console.error('Error fetching weather:', error);
        return Promise.reject(error);
    });
    const location = getGeoLocation();
}).then(data => { console.log(data);
  // Display the weather description in the h1 element

  getWeather(data[0]).then(weatherData => {
    console.log(weatherData.weather[0].description);
    h1.textContent = `Weather in ${data[0].name.common}: ${weatherData.weather[0].description}`;
    changeBackground(weatherData.weather[0].description);
  });
})

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

