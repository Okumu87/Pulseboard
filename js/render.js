import { currentWeather, getWeatherDescription } from "./weather.js"
import { habits } from './data.js';

// functions 

export function renderHabits (searchTerm = ''){

     const habitContainer = document.getElementById("habit-list");
   
        const weatherHtml = currentWeather 
        ? `<p>Today's weather: ${currentWeather.temperature_2m}°C, ${getWeatherDescription(currentWeather.weathercode)}</p>` 
        : `<p>Loading weather...</p>`;

        const filteredHabits = habits.filter(habit=>
        habit.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
 

    const habitHtml = filteredHabits.map(habit => 
        `<div>${habit.name} (${habit.category}) — Target: ${habit.targetPerDay} ${habit.unit} ${habit.loggedToday >= habit.targetPerDay ? '✅' : ''} ${habit.loggedToday >= habit.targetPerDay ? 0 : habit.targetPerDay - habit.loggedToday}  <button class="log-btn" data-id="${habit.id}">+1</button> <button class="delete-btn" data-id="${habit.id}">🗑️</button></div>`
    ).join('');

    habitContainer.innerHTML = weatherHtml + habitHtml;


}

