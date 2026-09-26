import { deleteHabit, habits, saveHabits } from "./data.js";
import {getWeather, } from "./weather.js";
import { renderHabits } from "./render.js";

getWeather().then(()=>{
    renderHabits();
})

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
            deleteHabit(habitId)
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


  const searchInput = document.getElementById('search-input');



    searchInput.addEventListener('input', (event)=>{
        renderHabits(event.target.value)
    })