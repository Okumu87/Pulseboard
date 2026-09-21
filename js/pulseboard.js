const defaultHabits = [
    {id: 0, name: "Drink water", 
        category: "Health", 
        targetPerDay: 5, 
        loggedToday: 0,
        unit: "glasses"},
    {id: 1, 
        name: "Wash hands", 
        category: "Productivity", 
        targetPerDay: 8, 
        loggedToday: 0,
        unit: "times"},
    {id: 2, 
        name: "Pray", 
        category: "Mindfulness", 
        targetPerDay: 6, 
        loggedToday: 0,
        unit: "times"},
    {id: 3, 
        name: "Read books", 
        category: "Others", 
        targetPerDay: 4, 
        loggedToday: 0,
        unit: "pages"}
]

let currentWeather = null;


// const habitNames = habits.map(habit => habit.name);

// console.log(habitNames)

// const mindfullnessHabits = habits.filter(habit=>habit.category === "Mindfulness");

// console.log(mindfullnessHabits)

// const habitById = habits.find(habit => habit.id === 3);

// console.log(habitById) 

// const totalDailyTarget = habits.reduce((total, habit) => total + habit.targetPerDay, 0);

// console.log(totalDailyTarget)


// const healthHabits = habits.filter(habit => habit.category === "Health");
// const averageTargetPerDay = healthHabits.reduce((total, habit) => total + habit.targetPerDay, 0) / healthHabits.length;

// console.log(averageTargetPerDay)


  // local storage

    function saveHabits(){
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    function loadHabits (){
        const saved = localStorage.getItem('habits');
        if(saved){
            return JSON.parse(saved);
        }else{
            return defaultHabits;
        }
    }

    let habits = loadHabits();

// functions 

function renderHabits (){

     const habitContainer = document.getElementById("habit-list");

        const weatherHtml = currentWeather 
        ? `<p>Today's weather: ${currentWeather.temperature_2m}°C, ${getWeatherDescription(currentWeather.weathercode)}</p>` 
        : `<p>Loading weather...</p>`;
 

    habitHtml = habits.map(habit => 
        `<div>${habit.name} (${habit.category}) — Target: ${habit.targetPerDay} ${habit.unit} ${habit.loggedToday >= habit.targetPerDay ? '✅' : ''} ${habit.loggedToday >= habit.targetPerDay ? 0 : habit.targetPerDay - habit.loggedToday}  <button class="log-btn" data-id="${habit.id}">+1</button> <button class="delete-btn" data-id="${habit.id}">🗑️</button></div>`
    ).join('');

 habitContainer.innerHTML = weatherHtml + habitHtml;
}

renderHabits();



const habitContainer = document.getElementById("habit-list");

habitContainer.addEventListener("click", (event) => {
        if(event.target.classList.contains("log-btn")){
           const habitId = Number(event.target.dataset.id);

           const habit = habits.find(habit => habit.id === habitId);
              if(habit){
                  habit.loggedToday = (habit.loggedToday || 0) + 1;
                  renderHabits();
                    saveHabits();
                 
              }
        }else if(event.target.classList.contains("delete-btn")){
            const habitId = Number(event.target.dataset.id);
            habits = habits.filter(habit => habit.id !== habitId);
            renderHabits();
            saveHabits();
        }

    });

//   form

const habitForm = document.getElementById("add-habit-form");;

habitForm.addEventListener("submit", (event) => {
    event.preventDefault();
 const input = document.getElementById("habit-name-input");
 const name = input.value.trim();
 if(!name) return;
 const newHabit = {
    id: Date.now(),
    name: name,
    category: "Others",
    targetPerDay: 1,
    loggedToday: 0,
    unit: "times"
 };
 habits.push(newHabit);
 renderHabits();
 saveHabits();
 input.value = "";
});

// async 

async function getWeather (){
    try{
        const urlWeather = await fetch ("https://api.open-meteo.com/v1/forecast?latitude=52.37&longitude=4.89&current=temperature_2m,weathercode");

        if (!urlWeather.ok){
            throw new Error(`HTTP error! status: ${urlWeather.status}`);
        }

        const data = await urlWeather.json();

        currentWeather = data.current;
        renderHabits();
        console.log(data);
    }catch(error){
        console.error("Error fetching weather data:", error);
    }
  
}

getWeather();


function getWeatherDescription(code) {
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