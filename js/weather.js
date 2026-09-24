

export let currentWeather = null;


// async 

export async function getWeather (){
    try{
        const urlWeather = await fetch ("https://api.open-meteo.com/v1/forecast?latitude=52.37&longitude=4.89&current=temperature_2m,weathercode");

        if (!urlWeather.ok){
            throw new Error(`HTTP error! status: ${urlWeather.status}`);
        }

        const data = await urlWeather.json();

        currentWeather = data.current;
        console.log(data);
    }catch(error){
        console.error("Error fetching weather data:", error);
    }
  
}



export function getWeatherDescription(code) {
   if(code === 0){
    return "Clear sky";
   }
   else if(code >= 1 && code <= 3){
    return "Partly cloudy";
   }
   else if(code === 45 || code === 48){
    return "Fog";
   }
   else if(code >= 51 && code <= 67){
    return "Drizzle";
   }
   else if(code >= 71 && code <= 86){
    return "Rain";
   }
   else if(code >= 95){
    return "Thunderstorm";
   }
   else{
    return "Unknown weather";
   }
}